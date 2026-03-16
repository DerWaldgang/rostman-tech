export type WithdrawRequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface WithdrawFormValues {
  amount: number;
  destination: string;
  confirmed: boolean;
}

export interface WithdrawRequest {
  amount: number;
  destination: string;
  idempotency_key: string;
}

export interface WithdrawResponse {
  id: string;
  status: string;
}

export interface WithdrawStoreState {
  status: WithdrawRequestStatus;
  withdrawalId: string | null;
  withdrawalStatus: string | null;
  error: string | null;
}

export interface WithdrawStoreActions {
  submit: (values: WithdrawFormValues) => Promise<void>;
  reset: () => void;
}

export type WithdrawStore = WithdrawStoreState & WithdrawStoreActions;
