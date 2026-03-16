'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Search, type LucideIcon } from 'lucide-react';

const tabs: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/withdraw', label: 'Вывод', icon: CreditCard },
  { href: '/withdrawals', label: 'Поиск', icon: Search },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Мобильная навигация"
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-sm md:hidden"
    >
      <ul className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-colors ${
                  active ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
