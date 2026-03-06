// src/lib/posts.ts
// ─────────────────────────────────────────────────────
// Reads MDX files from src/content/posts/, parses
// frontmatter with gray-matter, computes reading time.
// All functions are server-side only (no 'use client').
// ─────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

// ── Types ──────────────────────────────────────────────

export interface PostFrontmatter {
  title: string
  date: string          // ISO date string "YYYY-MM-DD"
  description: string
  tags: string[]
  published?: boolean   // default true; set false to draft
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string       // raw MDX string
  readingTime: string   // e.g. "6 min read"
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: string
}

// ── Helpers ────────────────────────────────────────────

function parseFrontmatter(raw: string, slug: string): Post {
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  const stats = readingTime(content)

  return {
    slug,
    title: fm.title,
    date: fm.date,
    description: fm.description,
    tags: fm.tags ?? [],
    published: fm.published !== false, // undefined → true
    content,
    readingTime: stats.text,
  }
}

// ── Public API ─────────────────────────────────────────

/** Returns all published posts sorted newest-first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const post = parseFrontmatter(raw, slug)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post
      return meta
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

/** Returns a single post by slug (including raw MDX content). */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(raw, slug)
}

/** Returns all slugs (for generateStaticParams). */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
