'use client'

// src/components/layout/Nav.tsx

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SITE, NAV_LINKS } from '@/lib/config'
import { cn } from '@/lib/utils'

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'border-b border-[var(--border)]',
        'transition-all duration-200',
        scrolled
          ? 'bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-md'
          : 'bg-[var(--background)]',
      )}
    >
      <div className="mx-auto flex h-14 max-w-[var(--max-w)] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span
            className="font-display text-[1.05rem] font-extrabold tracking-[-0.04em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {SITE.name}
          </span>
          <span className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--accent)] ml-[2px] self-center transition-transform duration-200 group-hover:scale-125" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-[0.78rem] font-mono tracking-[0.02em] transition-all duration-150',
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className={cn(
              'md:hidden flex flex-col items-center justify-center h-9 w-9 rounded-lg border gap-[5px]',
              'border-[var(--border)] transition-all',
              menuOpen && 'bg-[var(--surface)]',
            )}
          >
            <span className={cn('block h-[1.5px] w-4 bg-[var(--muted)] rounded transition-all', menuOpen && 'rotate-45 translate-y-[6.5px]')} />
            <span className={cn('block h-[1.5px] w-4 bg-[var(--muted)] rounded transition-all', menuOpen && 'opacity-0')} />
            <span className={cn('block h-[1.5px] w-4 bg-[var(--muted)] rounded transition-all', menuOpen && '-rotate-45 -translate-y-[6.5px]')} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2.5 rounded-md text-[0.9rem] transition-all',
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--accent-dim)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
