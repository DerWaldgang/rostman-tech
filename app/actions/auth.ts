'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken, SESSION_COOKIE } from '@/lib/auth';

const MOCK_USERNAME = process.env.AUTH_USERNAME ?? 'admin';
const MOCK_PASSWORD = process.env.AUTH_PASSWORD ?? 'password';

export async function login(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const username = (formData.get('username') as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null) ?? '';

  if (username !== MOCK_USERNAME || password !== MOCK_PASSWORD) {
    return { error: 'Неверный логин или пароль.' };
  }

  const token = await createSessionToken(username);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60, // 8 часов
    path: '/',
  });

  const next = (formData.get('next') as string | null) ?? '/';
  redirect(next.startsWith('/') ? next : '/');
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
