'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-sm font-bold text-white">
            ES
          </div>
          <span className="text-lg font-semibold text-navy-900">
            Escola Segura
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link
            href="/#metodologia"
            className="text-text-secondary hover:text-navy-800 transition-colors"
          >
            Metodologia
          </Link>
          <Link
            href="/#pilares"
            className="text-text-secondary hover:text-navy-800 transition-colors"
          >
            Pilares
          </Link>
          <Link
            href="/diagnostico"
            className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700"
          >
            Iniciar Diagnóstico
          </Link>
        </nav>
        <Link
          href="/diagnostico"
          className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700 sm:hidden"
        >
          Iniciar
        </Link>
      </div>
    </header>
  );
}
