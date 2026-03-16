import type { Metadata } from 'next';
import { CreditCard, Search } from 'lucide-react';
import { RouteCard } from '@/components/ui/route-card';

export const metadata: Metadata = { title: 'Главная' };

const routes = [
  {
    href: '/withdraw',
    label: 'Вывод средств',
    description: 'Отправьте USDT на внешний кошелёк или счёт.',
    icon: CreditCard,
    accent: 'group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40',
    iconColor: 'text-indigo-400',
  },
  {
    href: '/withdrawals',
    label: 'Отслеживание',
    description: 'Найдите вывод по ID и проверьте его текущий статус.',
    icon: Search,
    accent: 'group-hover:bg-emerald-600/20 group-hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">Withdraw App</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {routes.map((route) => (
          <RouteCard key={route.href} {...route} />
        ))}
      </div>
    </main>
  );
}
