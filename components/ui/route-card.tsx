import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface RouteCardProps {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  iconColor: string;
}

export function RouteCard({ href, label, description, icon: Icon, accent, iconColor }: RouteCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors ${accent}`}
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 transition-colors group-hover:border-current ${iconColor}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
      </div>

      <div>
        <h2 className="text-base font-semibold text-white">{label}</h2>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors group-hover:text-zinc-400">
        Открыть
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}
