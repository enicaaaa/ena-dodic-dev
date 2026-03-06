'use client'

// src/components/sections/NewsletterForm.tsx

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Props {
  className?: string
  compact?: boolean  // smaller layout for sidebar/article bottom
}

export function NewsletterForm({ className, compact = false }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data: { error?: string } = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong')
      }

      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('rounded-xl border border-[var(--accent-border)] bg-[var(--accent-dim)] p-6', className)}>
        <p className="text-sm font-mono text-[var(--accent)]">✓ You&apos;re in.</p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Next article lands in your inbox when it&apos;s ready.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6', className)}>
      {!compact && (
        <>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-2">Newsletter</p>
          <h3
            className="text-lg font-extrabold tracking-tight text-[var(--text)] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            When I figure something out, you get it first.
          </h3>
        </>
      )}
      <p className="text-sm text-[var(--muted)] mb-4">
        Deep dives on Next.js App Router, RSC patterns, and performance — sent only when there&apos;s something worth saying. No fluff.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          className={cn(
            'flex-1 min-w-[200px] rounded-lg border border-[var(--border)] bg-[var(--background)]',
            'px-3.5 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)]',
            'outline-none transition-colors focus:border-[var(--accent)]',
            'disabled:opacity-50',
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={cn(
            'rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[#0C0C0C]',
            'transition-opacity hover:opacity-85 disabled:opacity-40 cursor-pointer',
          )}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
      )}
    </div>
  )
}
