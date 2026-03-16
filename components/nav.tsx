'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/withdraw', label: 'Вывод' },
  { href: '/withdrawals', label: 'Отслеживание' },
];

export function Nav({ username }: { username?: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold">
            W
          </span>
          WithdrawApp
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Основная навигация" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {username && (
            <div className="flex items-center gap-3 border-l border-zinc-800 pl-4">
              <span className="hidden text-xs text-zinc-500 sm:block">{username}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  Выйти
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
