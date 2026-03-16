import type { Metadata } from 'next';
import { CreditCard } from 'lucide-react';
import { WithdrawForm } from '@/components/withdraw-form';

export const metadata: Metadata = { title: 'Вывод' };

export default function WithdrawPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4">
          <CreditCard className="w-6 h-6 text-indigo-400" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Вывод средств</h1>
        <p className="mt-1 text-sm text-zinc-500">Перевод USDT на внешний адрес</p>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6">
        <WithdrawForm />
      </div>

      <p className="mt-6 text-center text-xs text-zinc-600">
        Вывод необратим. Проверьте адрес перед отправкой.
      </p>
    </main>
  );
}
