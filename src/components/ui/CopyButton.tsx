'use client'

import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono text-[0.7rem] text-[var(--accent)] hover:underline cursor-pointer transition-colors"
    >
      {copied ? 'Copied ✓' : 'Copy →'}
    </button>
  )
}