'use client';

import { useState, type FormEvent } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { fetchWithdrawal } from '@/api/withdraw-api';
import { Spinner } from '@/components/ui/spinner';
import type { WithdrawResponse } from '@/types/withdraw';

type LookupStatus = 'idle' | 'loading' | 'success' | 'error';

const statusStyles: Record<string, string> = {
  pending:   'bg-amber-400/10 border-amber-400/20 text-amber-400',
  confirmed: 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400',
  failed:    'bg-red-400/10 border-red-400/20 text-red-400',
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? 'bg-zinc-400/10 border-zinc-400/20 text-zinc-400';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function WithdrawalLookup() {
  const [id, setId] = useState('');
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>('idle');
  const [result, setResult] = useState<WithdrawResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = id.trim();
    if (!trimmed) return;

    setLookupStatus('loading');
    setResult(null);
    setError(null);

    try {
      const data = await fetchWithdrawal(trimmed);
      setResult(data);
      setLookupStatus('success');
    } catch (err: unknown) {
      const { isAxiosError } = await import('axios').then((m) => m.default);
      let message = 'Что-то пошло не так. Попробуйте ещё раз.';
      if (isAxiosError(err)) {
        message = err.response?.status === 404
          ? 'Вывод с таким ID не найден.'
          : (err.response?.data?.message ?? message);
      }
      setError(message);
      setLookupStatus('error');
    }
  };

  const isLoading = lookupStatus === 'loading';

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="flex gap-2">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Введите ID вывода…"
          disabled={isLoading}
          aria-label="ID вывода"
          className="block min-w-0 flex-1 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!id.trim() || isLoading}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none"
        >
          {isLoading ? <Spinner /> : <Search className="h-4 w-4" aria-hidden="true" />}
          <span className="sr-only">Найти</span>
        </button>
      </form>

      {lookupStatus === 'error' && error && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {lookupStatus === 'success' && result && (
        <div role="status" aria-live="polite" className="rounded-xl border border-zinc-700 bg-zinc-800/50 divide-y divide-zinc-700">
          <div className="flex items-center justify-between px-4 py-3 gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">ID</span>
            <span className="font-mono text-sm text-zinc-200 text-right">{result.id}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Статус</span>
            <StatusBadge status={result.status} />
          </div>
        </div>
      )}
    </div>
  );
}
