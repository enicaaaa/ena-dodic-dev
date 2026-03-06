// src/app/api/subscribe/route.ts
// ─────────────────────────────────────────────────────
// Receives { email } via POST, adds the contact to a
// Resend Audience. Requires env vars:
//   RESEND_API_KEY      — from resend.com
//   RESEND_AUDIENCE_ID  — from Resend Audiences dashboard
// ─────────────────────────────────────────────────────

import { NextResponse, type NextRequest} from 'next/server';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()

    if (
      typeof body !== 'object' ||
      body === null ||
      !('email' in body) ||
      typeof (body as { email: unknown }).email !== 'string'
    ) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const email = (body as { email: string }).email.trim().toLowerCase()

    // Basic email shape validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
