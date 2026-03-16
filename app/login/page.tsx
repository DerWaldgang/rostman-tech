import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { User } from 'lucide-react';
import { getSession } from '@/lib/session';
import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = { title: 'Вход' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (session) redirect('/');

  const { next } = await searchParams;

  return (
    <main className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4">
            <User className="w-6 h-6 text-indigo-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Добро пожаловать</h1>
          <p className="mt-1 text-sm text-zinc-500">Войдите в аккаунт, чтобы продолжить</p>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Демо: <span className="text-zinc-500 font-mono">admin / password</span>
        </p>
      </div>
    </main>
  );
}
