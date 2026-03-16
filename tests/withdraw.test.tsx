import { act } from 'react';
import axios from 'axios';
import { useWithdrawStore } from '@/store/withdraw-store';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


Object.defineProperty(globalThis, 'crypto', {
  value: { randomUUID: () => 'test-uuid-1234' },
  configurable: true,
});

beforeEach(() => {
  useWithdrawStore.setState({
    status: 'idle',
    withdrawalId: null,
    withdrawalStatus: null,
    error: null,
  });
  jest.clearAllMocks();
});

const validFormValues = {
  amount: 100,
  destination: '0xAbCdEf1234567890',
  confirmed: true,
};

describe('withdrawStore', () => {
  it('happy path: transitions idle → loading → success and surfaces withdrawal id/status', async () => {
    const postResponse = { data: { id: 'wd-001', status: 'pending' } };
    const getResponse = { data: { id: 'wd-001', status: 'confirmed' } };

    (mockedAxios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);
    mockedAxios.post = jest.fn().mockResolvedValue(postResponse);
    mockedAxios.get = jest.fn().mockResolvedValue(getResponse);

    const { submit } = useWithdrawStore.getState();

    expect(useWithdrawStore.getState().status).toBe('idle');

    let submitPromise: Promise<void>;
    await act(async () => {
      submitPromise = submit(validFormValues);
    });

    await act(async () => {
      await submitPromise!;
    });

    const state = useWithdrawStore.getState();
    expect(state.status).toBe('success');
    expect(state.withdrawalId).toBe('wd-001');
    expect(state.withdrawalStatus).toBe('confirmed');
    expect(state.error).toBeNull();

    expect(mockedAxios.post).toHaveBeenCalledWith('/v1/withdrawals', {
      amount: 100,
      destination: '0xAbCdEf1234567890',
      idempotency_key: 'test-uuid-1234',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('/v1/withdrawals/wd-001');
  });

  it('API error: shows readable message on 409 conflict and transitions to error state', async () => {
    const conflict = Object.assign(new Error('Conflict'), {
      isAxiosError: true,
      response: { status: 409, data: {} },
    });

    (mockedAxios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);
    mockedAxios.post = jest.fn().mockRejectedValue(conflict);

    await act(async () => {
      await useWithdrawStore.getState().submit(validFormValues);
    });

    const state = useWithdrawStore.getState();
    expect(state.status).toBe('error');
    expect(state.error).toMatch(/уже был обработан/i);
    expect(state.withdrawalId).toBeNull();
  });

  it('double-submit protection: second call while loading is a no-op', async () => {
    let resolvePost!: (v: unknown) => void;
    const hangingPost = new Promise((res) => { resolvePost = res; });

    (mockedAxios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);
    mockedAxios.post = jest.fn().mockReturnValue(hangingPost);
    mockedAxios.get = jest.fn().mockResolvedValue({ data: { id: 'wd-002', status: 'pending' } });

    const { submit } = useWithdrawStore.getState();

    const first = submit(validFormValues);
    expect(useWithdrawStore.getState().status).toBe('loading');

    await act(async () => {
      await submit(validFormValues);
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    resolvePost({ data: { id: 'wd-002', status: 'pending' } });
    await act(async () => { await first; });
  });
});
