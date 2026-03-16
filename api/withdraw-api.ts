import axios from 'axios';
import type { WithdrawRequest, WithdrawResponse } from '@/types/withdraw';

const MAX_RETRIES = 3;

function isNetworkError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response === undefined;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithdrawal(id: string): Promise<WithdrawResponse> {
  const response = await axios.get<WithdrawResponse>(`/v1/withdrawals/${id}`);
  return response.data;
}

export async function postWithdrawal(
  data: WithdrawRequest,
): Promise<WithdrawResponse> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.post<WithdrawResponse>(
        '/v1/withdrawals',
        data,
      );
      return response.data;
    } catch (error) {
      lastError = error;
      if (isNetworkError(error) && attempt < MAX_RETRIES) {
        await delay(500 * Math.pow(2, attempt));
        continue;
      }
      throw error;
    }
  }

  throw lastError;
}
