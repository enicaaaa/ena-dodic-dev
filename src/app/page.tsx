// src/app/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { SITE, SOCIAL_LINKS } from '@/lib/config'
import { NewsletterForm } from '@/components/sections/NewsletterForm'
import { SocialIcon } from '@/components/ui/SocialIcon'

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
}

// Talks data lives here until a CMS / MDX is warranted
const TALKS = [
  {
    title: 'Caching in Next.js App Router: The Mental Model Nobody Explains',
    event: 'Available topic',
    date: null,
    status: 'upcoming' as const,
  },
  {
    title: "You're Loading 10× More JavaScript Than You Think",
    event: 'Available topic',
    date: null,
    status: 'upcoming' as const,
  },
]

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3) // 3 most recent

  return (
    <div className="mx-auto max-w-[var(--max-w)] px-6 pt-20 pb-24">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-16 pb-20">

        {/* Available to speak badge */}
        <div className="animate-fade-up delay-1 mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-dim)] px-3 py-1.5">
          <span className="pulse-dot" />
          <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[var(--accent)]">
            Available to speak
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-2 font-extrabold tracking-[-0.04em] leading-[1.02] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          }}
        >
          Next.js{' '}
          <span className="text-[var(--accent)]">Engineer</span>
          <br />
          &amp; Educator.
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up delay-3 max-w-[500px] text-[1.05rem] leading-[1.65] text-[var(--muted)] mb-9">
          5 years of production Next.js. I write deep articles on App Router,
          React Server Components, and performance — and I&apos;m starting to talk about them at conferences.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-4 flex flex-wrap gap-3 mb-16">
          <Link
            href="/writing"
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0C0C0C] transition-opacity hover:opacity-85"
          >
            Read articles
          </Link>
          <Link
            href="/speaking"
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
          >
            View talks →
          </Link>
        </div>

        {/* ── Recent writing ─────────────────────────── */}
        {posts.length > 0 && (
          <div className="animate-fade-up delay-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] mb-4">
              Recent Writing
            </p>
            <div className="border-t border-[var(--border)]">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group relative flex items-center justify-between gap-4 border-b border-[var(--border)] py-4 transition-all"
                >
                  {/* Hover bg */}
                  <span className="absolute inset-x-[-12px] inset-y-1 rounded-lg bg-[var(--surface)] opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="relative text-[0.95rem] font-medium transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </span>

                  <span className="relative shrink-0 font-mono text-[0.65rem] text-[var(--muted)]">
                    {formatDate(post.date)}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/writing"
              className="mt-4 inline-block font-mono text-[0.72rem] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              All articles →
            </Link>
          </div>
        )}

        {/* ── Two-column: talks + about ──────────────── */}
        <div className="animate-fade-up delay-6 mt-16 grid gap-8 sm:grid-cols-2">
          {/* Talks */}
          <div>
            <p className="border-b border-[var(--border)] pb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] mb-0">
              Talks
            </p>
            {TALKS.map((talk) => (
              <div
                key={talk.title}
                className="border-b border-[var(--border)] py-4"
              >
                <p className="text-[0.9rem] font-medium leading-snug text-[var(--text)] mb-1.5">
                  {talk.title}
                </p>
                <p className="font-mono text-[0.63rem] text-[var(--muted)]">
                  {talk.event}
                </p>
              </div>
            ))}
            <Link
              href="/speaking"
              className="mt-4 inline-block font-mono text-[0.72rem] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              Speaking page →
            </Link>
          </div>

          {/* Quick about */}
          <div>
            <p className="border-b border-[var(--border)] pb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] mb-0">
              About
            </p>
            <div className="py-4">
              <p className="text-[0.9rem] leading-relaxed text-[var(--muted)] mb-4">
                I&apos;m Ena — a frontend engineer from Serbia. I&apos;ve spent the last 5 years
                shipping production Next.js apps and learning the hard lessons that never appear in the docs.
              </p>
              <p className="text-[0.9rem] leading-relaxed text-[var(--muted)] mb-4">
                Now I&apos;m turning that experience into articles and conference talks. If it confused me
                for a week, I&apos;ll write about it so it takes you an afternoon.
              </p>
              <Link
                href="/about"
                className="font-mono text-[0.72rem] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                Full story →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Newsletter ─────────────────────────────── */}
        <div className="mt-16">
          <NewsletterForm />
        </div>

        {/* ── Social links ───────────────────────────── */}
        <div className="mt-10 flex items-center gap-2 border-t border-[var(--border)] pt-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </div>

      </section>
    </div>
  )
}
