// src/components/ui/MdxComponents.tsx
// Custom MDX components that replace default HTML elements.
// Passed to <MDXRemote components={...} />

import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

export const mdxComponents: MDXComponents = {
  // Code blocks — styled with surface bg, monospace, accent highlight
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className={cn(
        'overflow-x-auto rounded-xl border border-[var(--border)]',
        'bg-[var(--surface)] p-5 text-sm leading-relaxed',
        'my-6',
      )}
    >
      {children}
    </pre>
  ),

  code: ({ children, className, ...props }) => {
    // Block code (inside <pre>) has a className like "language-ts"
    if (className) {
      return (
        <code className={cn('font-mono text-[0.88em]', className)} {...props}>
          {children}
        </code>
      )
    }
    // Inline code
    return (
      <code
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--accent)]"
        {...props}
      >
        {children}
      </code>
    )
  },

  // Callout / blockquote — styled with accent left border
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-[var(--accent)] pl-5 text-[var(--muted)] italic"
    >
      {children}
    </blockquote>
  ),

  // Links — accent color
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-[var(--accent)] underline underline-offset-3 decoration-[var(--accent-border)] hover:decoration-[var(--accent)] transition-colors"
      {...props}
    >
      {children}
    </a>
  ),

  // Headings — use display font
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-12 mb-4 font-extrabold tracking-tight text-[var(--text)]"
      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 3vw, 1.7rem)' }}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-8 mb-3 font-bold tracking-tight text-[var(--text)] text-xl"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h3>
  ),

  // Paragraph — body size, comfortable line height
  p: ({ children, ...props }) => (
    <p
      {...props}
      className="my-5 text-[1.03rem] leading-[1.75] text-[var(--text)]"
    >
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul {...props} className="my-5 space-y-2 pl-6 list-disc marker:text-[var(--accent)]">
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol {...props} className="my-5 space-y-2 pl-6 list-decimal marker:text-[var(--accent)]">
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li {...props} className="text-[1rem] leading-relaxed text-[var(--text)]">
      {children}
    </li>
  ),

  // Horizontal rule
  hr: () => <hr className="my-10 border-[var(--border)]" />,
}
