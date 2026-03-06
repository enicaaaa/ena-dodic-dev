// src/lib/config.ts
// ─────────────────────────────────────────────────────
// Single source of truth for all site-level constants.
// Import this anywhere you need name, URL, social links, etc.
// ─────────────────────────────────────────────────────

export const SITE = {
  name: 'Ena Dodić',
  initials: 'ED',
  title: 'Ena Dodić — Next.js Engineer & Educator',
  description:
    'Senior Frontend Engineer specialising in Next.js. Deep articles on App Router, RSC, and performance from 5 years of production experience.',
  url: 'https://enadodic.dev',
  handle: '@enadodic',
  email: 'ena@enadodic.dev',
  // Resend audience ID — set in .env.local
  resendAudienceId: process.env.RESEND_AUDIENCE_ID ?? '',
} as const

export const NAV_LINKS = [
  { label: 'Writing',  href: '/writing' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'About',    href: '/about' },
  { label: 'Now',      href: '/now' },
] as const

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/enadodic',
    icon: 'github',
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/enadodic',
    icon: 'twitter',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/enadodic',
    icon: 'linkedin',
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/enadodic.dev',
    icon: 'bluesky',
  },
] as const

export type SocialIcon = (typeof SOCIAL_LINKS)[number]['icon']
