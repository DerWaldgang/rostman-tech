import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Nav } from '@/components/nav';
import { BottomNav } from '@/components/bottom-nav';
import { getSession } from '@/lib/session';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'WithdrawApp', template: '%s | WithdrawApp' },
  description: 'USDT withdrawal management',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 antialiased pb-16 md:pb-0`}>
        <Nav username={session?.username} />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
