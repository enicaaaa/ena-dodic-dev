// src/app/about/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/config'
import { NewsletterForm } from '@/components/sections/NewsletterForm'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Senior Frontend Engineer specialising in Next.js. 5+ years shipping production apps. Now building a name in engineering education.',
}

const TIMELINE = [
  {
    year: '2019',
    event: 'First professional job — junior frontend at an agency. Shipped jQuery, survived.',
  },
  {
    year: '2020',
    event: 'Moved to React full-time. Pages Router Next.js. Learned the hard way why SSR matters.',
  },
  {
    year: '2022',
    event:
      'Led frontend architecture on a production Next.js SaaS. First time I owned the whole stack.',
  },
  {
    year: '2023',
    event:
      'App Router released. Six months of confusion, then genuine appreciation for what it solved.',
  },
  {
    year: '2024',
    event:
      "Became the team's go-to for performance debugging. Core Web Vitals went from red to green.",
  },
  {
    year: '2025',
    event:
      'Published first technical article. Decided to make this a deliberate part of my career.',
  },
  {
    year: '2026',
    event: 'Building in public: this site, open-source tools, and conference talks in progress.',
  },
]

const SPECIALISMS = [
  'Next.js App Router — routing, caching, layouts, and the mental models that make it click',
  'React Server Components — when to use them, when not to, and what they actually cost',
  "Server Actions — the gotchas nobody documents until you've already hit them in production",
  'Performance — bundle analysis, Core Web Vitals, lazy loading, and making Lighthouse happy',
  'Developer tooling — TypeScript, ESLint configs, CI/CD, and repo organisation that scales',
]

export default function AboutPage() {
  return (
    <div className="mx-auto px-6 pt-20 pb-24" style={{ maxWidth: 'var(--prose-w)' }}>
      {/* Header */}
      <div className="border-b border-[var(--border)] pt-14 pb-10">
        <h1
          className="animate-fade-up mb-4 font-extrabold tracking-[-0.04em] delay-1"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          About
        </h1>
      </div>

      <section className="mb-4 mt-4 flex items-start gap-6">
        {/* Photo — small, subtle */}
        <div className="shrink-0">
          <Image
            src="/about/Ena.jpeg"
            alt="Ena Dodić"
            width={80}
            height={80}
            className="rounded-full border border-[var(--border)] grayscale transition-all duration-300 hover:grayscale-0"
            priority
          />
        </div>
      </section>

      <div className="animate-fade-up space-y-4 delay-2">
        {/* Intro */}
        <section>
          <p className="mb-4 text-[1.05rem] leading-[1.75] text-[var(--text)]">
            I&apos;m Ena — a frontend engineer based in Serbia. I&apos;ve been building with Next.js
            since before the App Router existed, and I&apos;ve watched it go from &quot;surprisingly
            good file-based routing&quot; to a genuinely complex full-stack framework.
          </p>
          <p className="mb-4 text-[1.05rem] leading-[1.75] text-[var(--text)]">
            The complexity is the interesting part. I&apos;ve spent years debugging the cache,
            untangling RSC boundaries, and figuring out why Server Actions don&apos;t always do what
            they look like they should. That accumulated knowledge is what I&apos;m now trying to
            turn into articles and talks.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-[var(--text)]">
            My goal: if something took me a week to figure out, it should take you an afternoon.
          </p>
        </section>

        {/* Timeline */}
        <section>
          <h2
            className="mb-6 text-xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Timeline
          </h2>
          <div className="space-y-0 border-t border-[var(--border)]">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex gap-6 border-b border-[var(--border)] py-4">
                <span className="w-10 shrink-0 pt-0.5 font-mono text-[0.72rem] text-[var(--accent)]">
                  {item.year}
                </span>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialisms */}
        <section>
          <h2
            className="mb-6 text-xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What I specialise in
          </h2>
          <ul className="space-y-3">
            {SPECIALISMS.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                <span className="mt-[3px] shrink-0 text-[var(--accent)]">→</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Currently focused on */}
        <section>
          <h2
            className="mb-4 text-xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Currently focused on
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--muted)]">
            Writing deep technical articles on Next.js. Preparing lightning talks for local meetups
            and eventually conference CFPs. Building this site as a live demo of what I know.
          </p>
          <Link
            href="/now"
            className="font-mono text-[0.72rem] text-[var(--accent)] hover:underline"
          >
            See what I&apos;m doing right now →
          </Link>
        </section>

        {/* Book to speak */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2
            className="mb-2 text-lg font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book me to speak
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
            I&apos;m available for conference talks, meetup sessions, and workshop facilitation on
            Next.js and React topics. See the{' '}
            <Link href="/speaking" className="text-[var(--accent)] hover:underline">
              speaking page
            </Link>{' '}
            for topics and speaker bios, or reach out directly.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#0C0C0C] transition-opacity hover:opacity-85"
          >
            {SITE.email}
          </a>
        </section>

        {/* Newsletter */}
        <NewsletterForm />
      </div>
    </div>
  )
}
