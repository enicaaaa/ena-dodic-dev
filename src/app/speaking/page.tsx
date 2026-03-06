// src/app/speaking/page.tsx

import type { Metadata } from 'next'
import { SITE } from '@/lib/config'
import { CopyButton } from '@/components/ui/CopyButton'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Talk abstracts, speaker bio, and available topics. Invite Ena to speak at your conference or meetup.',
}

const PAST_TALKS: {
  title: string
  description: string
  event: string
  date: string
  slides?: string
  video?: string
}[] = [
  // Add real talks here as they happen.
  // Example structure:
  {
    title: 'Caching in Next.js App Router: The Mental Model',
    description: '…',
    event: 'React Vienna Meetup',
    date: '2026-03-15',
    slides: 'https://slides.com/…',
  },
]

const AVAILABLE_TOPICS = [
  {
    title: 'Caching in Next.js App Router: The Mental Model Nobody Explains',
    duration: '15–30 min',
    description:
      'The App Router has four separate layers of caching and almost no one understands how they interact. This talk gives you a single mental model that makes all four click — and shows you which cache to blame when something breaks.',
    tags: ['next.js', 'caching', 'app-router'],
  },
  {
    title: "You're Loading 10× More JavaScript Than You Think",
    duration: '20–30 min',
    description:
      'A live bundle audit of a typical Next.js app. We identify the 3–4 patterns that silently add hundreds of KB, then fix them on stage. Audience leaves with an actual checklist.',
    tags: ['performance', 'bundle', 'next.js'],
  },
  {
    title: 'Server Actions: 3 Mistakes That Cost Us Real User Sessions',
    duration: '15 min',
    description:
      'War-story format. Three production bugs I introduced using Server Actions, why they happened, and the patterns I now follow to avoid them. High relatability, practical takeaways.',
    tags: ['server-actions', 'next.js', 'production'],
  },
  {
    title: 'Partial Prerendering: The Architecture That Changes Everything',
    duration: '20–30 min',
    description:
      'PPR is the biggest architectural shift in Next.js since the App Router. This talk explains what it is, when to reach for it, and how to think about the static/dynamic boundary in a new way.',
    tags: ['ppr', 'next.js', 'architecture'],
  },
]

const SHORT_BIO =
  'Ena Dodić is a Senior Frontend Engineer with 5+ years of production experience, specialising in Next.js and the React ecosystem. She writes deep technical articles on App Router, RSC, and performance, and speaks at conferences about the lessons that only come from shipping real software.'

const LONG_BIO =
  'Ena Dodić is a Senior Frontend Engineer based in Serbia, with over five years of production experience building complex applications with Next.js and React. She has worked with both the Pages Router and the App Router, shipped software to real users, and accumulated a hard-won understanding of the parts of the framework that the documentation glosses over — caching, Server Actions, bundle optimisation, and the mental models that make RSC actually make sense. In 2026, Ena began transitioning into engineering education: writing deep technical articles and speaking at conferences. Her goal is to make the hard parts of Next.js genuinely accessible — not watered-down, but clearly explained by someone who has made all the mistakes in production.'

export default function SpeakingPage() {
  return (
    <div className="mx-auto max-w-[var(--max-w)] px-6 pt-20 pb-24">
      {/* Header */}
      <div className="border-b border-[var(--border)] pt-14 pb-10">
        <h1
          className="animate-fade-up mb-3 font-extrabold tracking-[-0.04em] delay-1"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Speaking
        </h1>
        <p className="animate-fade-up max-w-[520px] text-[var(--muted)] delay-2">
          Available for conference talks and meetups on Next.js, React, and frontend performance.
          See topics below, or reach out directly.
        </p>
      </div>

      <div className="animate-fade-up mt-12 grid gap-16 delay-3 lg:grid-cols-[1fr_320px]">
        {/* ── Main column ── */}
        <div>
          {/* Past talks (hidden when empty) */}
          {PAST_TALKS.length > 0 && (
            <section className="mb-14">
              <h2
                className="mb-6 text-xl font-extrabold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Past talks
              </h2>
              <div className="space-y-6">
                {PAST_TALKS.map((talk) => (
                  <div
                    key={talk.title}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
                  >
                    <h3 className="mb-1 font-semibold tracking-[-0.01em] text-[var(--text)]">
                      {talk.title}
                    </h3>
                    <p className="mb-3 font-mono text-[0.68rem] text-[var(--muted)]">
                      {talk.event} · {talk.date}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
                      {talk.description}
                    </p>
                    <div className="flex gap-3">
                      {talk.slides && (
                        <a
                          href={talk.slides}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[0.72rem] text-[var(--accent)] hover:underline"
                        >
                          Slides →
                        </a>
                      )}
                      {talk.video && (
                        <a
                          href={talk.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[0.72rem] text-[var(--accent)] hover:underline"
                        >
                          Video →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Available topics */}
          <section>
            <h2
              className="mb-6 text-xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Available topics
            </h2>
            <div className="space-y-5">
              {AVAILABLE_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--border-hover)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="leading-snug font-semibold tracking-[-0.01em] text-[var(--text)]">
                      {topic.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-[0.62rem] whitespace-nowrap text-[var(--muted)]">
                      {topic.duration}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-dim)] px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.05em] text-[var(--accent)] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside className="space-y-6">
          {/* Invite CTA */}
          <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-dim)] p-6">
            <h3
              className="mb-2 font-extrabold tracking-tight text-[var(--text)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Invite me to speak
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
              Drop me an email with your event details — format, audience size, date, and topic
              you&apos;re interested in.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Speaking inquiry`}
              className="inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#0C0C0C] transition-opacity hover:opacity-85"
            >
              {SITE.email}
            </a>
          </div>

          {/* Short bio */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="mb-3 font-mono text-[0.62rem] tracking-widest text-[var(--muted)] uppercase">
              Speaker bio (short · 50 words)
            </p>
            <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{SHORT_BIO}</p>
            <CopyButton text={SHORT_BIO} />
          </div>

          {/* Long bio */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="mb-3 font-mono text-[0.62rem] tracking-widest text-[var(--muted)] uppercase">
              Speaker bio (long · 150 words)
            </p>
            <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{LONG_BIO}</p>
            <CopyButton text={LONG_BIO} />
          </div>
        </aside>
      </div>
    </div>
  )
}
