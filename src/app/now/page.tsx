// src/app/now/page.tsx
// ─────────────────────────────────────────────────────
// Update this page every month or two.
// It's more honest than a static "projects" page.
// ─────────────────────────────────────────────────────

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Ena is working on right now.',
}

// ── Update this every month ──
const LAST_UPDATED = 'March 2026'

const NOW_ITEMS = [
  {
    category: 'Building',
    content:
      'This site — enadodic.dev. Every technical decision is intentional and I can explain it. The source is public on GitHub.',
  },
  {
    category: 'Writing',
    content:
      'Working on a deep article about the Next.js App Router caching model. Specifically: the difference between the Router Cache and the Data Cache, and why invalidating one doesn\'t invalidate the other.',
  },
  {
    category: 'Preparing',
    content:
      'First conference CFP submission for React Summit 2026. Talk title: "Caching in Next.js App Router: The Mental Model Nobody Explains." Draft abstract done, refining the demo.',
  },
  {
    category: 'Learning',
    content:
      'Going deep on Partial Prerendering. The mental model is genuinely different from anything before it in React/Next.js, and I want to understand the internals well enough to teach it.',
  },
  {
    category: 'Reading',
    content:
      '"The Art of Doing Science and Engineering" by Hamming. Recommended by a colleague. Slow going but worth it.',
  },
]

export default function NowPage() {
  return (
    <div className="mx-auto px-6 pt-20 pb-24" style={{ maxWidth: 'var(--prose-w)' }}>

      <div className="pt-14 pb-10 border-[var(--border)]">
        <h1
          className="animate-fade-up delay-1 font-extrabold tracking-[-0.04em] mb-3"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Now
        </h1>
        <p className="animate-fade-up delay-2 font-mono text-[0.68rem] text-[var(--muted)]">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="animate-fade-up delay-3 mt-10 space-y-0 border-t border-[var(--border)]">
        {NOW_ITEMS.map((item) => (
          <div
            key={item.category}
            className="grid grid-cols-[80px_1fr] gap-6 border-b border-[var(--border)] py-6"
          >
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--accent)] pt-0.5">
              {item.category}
            </span>
            <p className="text-[1rem] leading-[1.7] text-[var(--muted)]">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs font-mono text-[var(--muted)] opacity-50">
        This is a{' '}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--text)] transition-colors"
        >
          /now page
        </a>
        . Updated manually, roughly every month.
      </p>

    </div>
  )
}
