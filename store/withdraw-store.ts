import { create } from 'zustand';
import axios from 'axios';
import { postWithdrawal, fetchWithdrawal } from '@/api/withdraw-api';
import type { WithdrawFormValues, WithdrawStore } from '@/types/withdraw';

const INITIAL_STATE = {
  status: 'idle' as const,
  withdrawalId: null,
  withdrawalStatus: null,
  error: null,
};

export const useWithdrawStore = create<WithdrawStore>((set, get) => ({
  ...INITIAL_STATE,

  submit: async (values: WithdrawFormValues) => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });

    try {
      await axios.get('/api/auth/me');
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        set({ status: 'error', error: 'Сессия истекла. Пожалуйста, войдите снова.' });
        return;
      }
    }

    try {
      const created = await postWithdrawal({
        amount: values.amount,
        destination: values.destination,
        idempotency_key: crypto.randomUUID(),
      });

      let withdrawal = created;
      try {
        withdrawal = await fetchWithdrawal(created.id);
      } catch {
        // TODO
      }

      set({
        status: 'success',
        withdrawalId: withdrawal.id,
        withdrawalStatus: withdrawal.status,
      });
    } catch (error) {
      let message = 'Произошла непредвиденная ошибка. Попробуйте ещё раз.';

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message = 'Сессия истекла. Пожалуйста, войдите снова.';
        } else if (error.response?.status === 409) {
          message = 'Этот запрос на вывод уже был обработан. Проверьте историю выводов.';
        } else if (
          typeof error.response?.data?.message === 'string' &&
          error.response.data.message.length > 0
        ) {
          message = error.response.data.message;
        } else if (!error.response) {
          message = 'Нет соединения с сервером. Проверьте подключение и попробуйте снова.';
        }
      }

      set({ status: 'error', error: message });
    }
  },

  reset: () => set(INITIAL_STATE),
}));
