import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import { WithdrawalLookup } from '@/components/withdrawal-lookup';

export const metadata: Metadata = { title: 'Отслеживание' };

export default function WithdrawalsPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 mb-4">
          <Search className="w-6 h-6 text-emerald-400" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Отслеживание вывода</h1>
        <p className="mt-1 text-sm text-zinc-500">Найдите вывод по его ID</p>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6">
        <WithdrawalLookup />
      </div>
    </main>
  );
}
