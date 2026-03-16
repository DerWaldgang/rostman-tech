'use client';

import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import type { WithdrawFormValues } from '@/types/withdraw';

export interface WithdrawFormViewProps {
  register: UseFormRegister<WithdrawFormValues>;
  errors: FieldErrors<WithdrawFormValues>;
  isValid: boolean;
  isLoading: boolean;
  storeError: string | null;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const inputBase =
  'block w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/20';

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1 text-xs text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function WithdrawFormView({
  register,
  errors,
  isValid,
  isLoading,
  storeError,
  onSubmit,
}: WithdrawFormViewProps) {
  return (
    <form onSubmit={onSubmit} noValidate aria-label="Форма вывода средств" className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="amount" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Сумма
        </label>
        <div className="relative">
          <input
            id="amount"
            type="number"
            step="any"
            min="0"
            placeholder="0.00"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            disabled={isLoading}
            className={`${inputBase} pr-16`}
            {...register('amount')}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 tracking-wider">
            USDT
          </span>
        </div>
        {errors.amount?.message && (
          <FieldError id="amount-error" message={errors.amount.message} />
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="destination" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Адрес назначения
        </label>
        <input
          id="destination"
          type="text"
          placeholder="0x… или адрес кошелька"
          aria-invalid={!!errors.destination}
          aria-describedby={errors.destination ? 'destination-error' : undefined}
          disabled={isLoading}
          className={`${inputBase} font-mono`}
          {...register('destination')}
        />
        {errors.destination?.message && (
          <FieldError id="destination-error" message={errors.destination.message} />
        )}
      </div>

      <div className="border-t border-zinc-800" />

      <div className="space-y-1.5">
        <label
          className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
            errors.confirmed
              ? 'border-red-500/50 bg-red-500/5'
              : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
          } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <input
            id="confirmed"
            type="checkbox"
            aria-invalid={!!errors.confirmed}
            aria-describedby={errors.confirmed ? 'confirmed-error' : undefined}
            disabled={isLoading}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-600 bg-zinc-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 disabled:cursor-not-allowed"
            {...register('confirmed')}
          />
          <span className="text-sm leading-snug text-zinc-300">
            Я подтверждаю, что данные вывода верны, и понимаю, что это действие{' '}
            <span className="font-semibold text-white">нельзя отменить</span>.
          </span>
        </label>
        {errors.confirmed?.message && (
          <FieldError id="confirmed-error" message={errors.confirmed.message} />
        )}
      </div>

      {storeError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{storeError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || isLoading}
        aria-disabled={!isValid || isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Spinner />
            Обработка…
          </>
        ) : (
          <>
            Вывести
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
