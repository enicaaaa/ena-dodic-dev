// src/components/layout/Footer.tsx

import Link from 'next/link'
import { SITE, SOCIAL_LINKS } from '@/lib/config'
import { SocialIcon } from '@/components/ui/SocialIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-[var(--max-w)] px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: name + copyright */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-0.5 mb-2 group w-fit"
          >
            <span
              className="font-extrabold tracking-[-0.04em] text-[var(--text)] text-sm"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {SITE.name}
            </span>
            <span className="inline-block h-[4px] w-[4px] rounded-full bg-[var(--accent)] ml-[2px] self-center" />
          </Link>
          <p className="text-[0.72rem] font-mono text-[var(--muted)]">
            © {year} · Built with Next.js 16 · Deployed on Vercel
          </p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-2">
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
      </div>
    </footer>
  )
}
