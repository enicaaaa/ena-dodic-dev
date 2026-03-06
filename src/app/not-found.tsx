// src/app/not-found.tsx

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[var(--max-w)] px-6 pt-20">
      <div className="flex flex-col items-start pt-20 pb-24">
        <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--accent)] mb-4">
          404
        </p>
        <h1
          className="font-extrabold tracking-[-0.04em] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Page not found.
        </h1>
        <p className="text-[var(--muted)] mb-8 max-w-md">
          This page doesn&apos;t exist — or maybe it did and it got deleted. Either way, there&apos;s nothing here.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0C0C0C] transition-opacity hover:opacity-85"
        >
          Back home →
        </Link>
      </div>
    </div>
  )
}
