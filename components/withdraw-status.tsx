'use client';

import { useState } from 'react';
import { Check, Copy, RotateCw } from 'lucide-react';
import { useWithdrawStore } from '@/store/withdraw-store';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Скопировано' : 'Скопировать ID вывода'}
      className="ml-2 rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      {copied
        ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        : <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      }
    </button>
  );
}

export function WithdrawStatus() {
  const withdrawalId = useWithdrawStore((s) => s.withdrawalId);
  const withdrawalStatus = useWithdrawStore((s) => s.withdrawalStatus);
  const reset = useWithdrawStore((s) => s.reset);

  return (
    <div role="status" aria-live="polite" className="space-y-5">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <Check className="h-6 w-6 text-emerald-400" strokeWidth={2} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Вывод отправлен</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Ваш запрос обрабатывается</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 divide-y divide-zinc-700">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 shrink-0">
            ID вывода
          </span>
          <div className="flex items-center gap-0.5 min-w-0 ml-4">
            <span className="font-mono text-sm text-zinc-200 truncate">{withdrawalId}</span>
            {withdrawalId && <CopyButton text={withdrawalId} />}
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Статус
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs font-semibold capitalize text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {withdrawalStatus}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <RotateCw className="h-4 w-4" aria-hidden="true" />
        Новый вывод
      </button>
    </div>
  );
}
