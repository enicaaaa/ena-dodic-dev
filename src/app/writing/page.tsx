// src/app/writing/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Deep articles on Next.js App Router, React Server Components, Server Actions, and performance — from 5 years of production experience.',
}

export default function WritingPage() {
  const posts = getAllPosts()

  // Group by year for the timeline layout
  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date.slice(0, 4)
    acc[year] = [...(acc[year] ?? []), post]
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="mx-auto max-w-[var(--max-w)] px-6 pt-20 pb-24">

      {/* Page header */}
      <div className="border-b border-[var(--border)] pb-10 pt-14">
        <h1
          className="animate-fade-up delay-1 font-extrabold tracking-[-0.04em] mb-3"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Writing
        </h1>
        <p className="animate-fade-up delay-2 text-[var(--muted)] max-w-[480px]">
          Deep dives from production. Things I had to learn the hard way so you don&apos;t have to.
        </p>
      </div>

      {/* Article list */}
      {posts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[var(--muted)]">First article coming soon.</p>
        </div>
      ) : (
        <div className="animate-fade-up delay-3">
          {years.map((year) => (
            <div key={year}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] py-6 border-b border-[var(--border)]">
                {year}
              </p>
              {byYear[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group relative flex items-start justify-between gap-6 border-b border-[var(--border)] py-5 sm:items-center"
                >
                  {/* Hover bg */}
                  <span className="absolute inset-x-[-16px] inset-y-1 rounded-lg bg-[var(--surface)] opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Left: title + excerpt */}
                  <div className="relative">
                    <p className="font-semibold tracking-[-0.01em] text-[var(--text)] transition-colors group-hover:text-[var(--accent)] mb-1">
                      {post.title}
                    </p>
                    <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[460px] hidden sm:block">
                      {post.description}
                    </p>
                  </div>

                  {/* Right: date + tags */}
                  <div className="relative shrink-0 flex flex-col items-end gap-1.5">
                    <span className="font-mono text-[0.65rem] text-[var(--muted)]">
                      {formatDate(post.date)}
                    </span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-dim)] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.05em] text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
