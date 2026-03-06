// src/app/api/og/route.tsx
// ─────────────────────────────────────────────────────
// Generates dynamic OG images using @vercel/og (next/og).
// Usage: /api/og?title=My+Article+Title
//
// Referenced in article metadata:
//   images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}` }]
// ─────────────────────────────────────────────────────

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Ena Dodić — Next.js Engineer & Educator'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0C0C0C',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#A3E635',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A3E635',
            }}
          >
            enadodic.dev
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? '52px' : '64px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#EDEDED',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Bottom: author */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '18px' }}>
            Next.js · React · Performance
          </span>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#EDEDED',
              letterSpacing: '-0.03em',
            }}
          >
            Ena Dodić
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
