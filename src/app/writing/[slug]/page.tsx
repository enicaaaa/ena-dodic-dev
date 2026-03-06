// src/app/writing/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { formatDateLong } from '@/lib/utils'
import { SITE } from '@/lib/config'
import { NewsletterForm } from '@/components/sections/NewsletterForm'
import { mdxComponents } from '@/components/ui/MdxComponents'

interface Props {
  params: Promise<{ slug: string }>
}

// ── Static generation ──────────────────────────────────

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

// ── Metadata ───────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const ogUrl = `${SITE.url}/api/og?title=${encodeURIComponent(post.title)}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${SITE.url}/writing/${slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
  }
}

// ── Page ───────────────────────────────────────────────

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto px-6 pt-20 pb-24" style={{ maxWidth: 'var(--prose-w)' }}>

      {/* Header */}
      <header className="pt-14 pb-10 border-b border-[var(--border)]">

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="animate-fade-up delay-1 flex gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-dim)] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1
          className="animate-fade-up delay-2 font-extrabold tracking-[-0.03em] leading-[1.1] mb-5"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
        >
          {post.title}
        </h1>

        <div className="animate-fade-up delay-3 flex items-center gap-4 font-mono text-[0.68rem] text-[var(--muted)]">
          <time dateTime={post.date}>{formatDateLong(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Body */}
      <div className="animate-fade-up delay-4 prose mt-10">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {/* Footer: newsletter */}
      <div className="mt-16 pt-10 border-t border-[var(--border)]">
        <NewsletterForm compact />
      </div>

    </article>
  )
}
