# ena-dodic-dev

Personal portfolio and technical writing site for [Ena Dodić](https://enadodic.dev) — Senior Frontend Engineer, Next.js specialist, and aspiring conference speaker.

The source is public because the site itself is meant to be a live demonstration of how to build a production Next.js application. Every technical decision is intentional and documented here.

---

## Stack

| Layer      | Choice                            | Why                                                            |
| ---------- | --------------------------------- | -------------------------------------------------------------- |
| Framework  | Next.js 15, App Router            | The subject of the site. Dogfooding is mandatory.              |
| Language   | TypeScript (strict)               | Non-negotiable on any serious project.                         |
| Styling    | Tailwind CSS v4                   | CSS variables for design tokens, utility classes for layout.   |
| Content    | MDX files + next-mdx-remote       | No CMS. Write in your editor, deploy via Git push.             |
| Email      | Resend                            | First-party Next.js integration, free tier is generous enough. |
| Deployment | Vercel                            | Zero config for Next.js. Fits the brand.                       |
| Analytics  | Vercel Analytics + Speed Insights | Dogfooding performance.                                        |

---

## Project structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout: ThemeProvider, Nav, Footer
│   ├── page.tsx              # Home /
│   ├── writing/
│   │   ├── page.tsx          # Article list /writing
│   │   └── [slug]/
│   │       └── page.tsx      # Individual article /writing/[slug]
│   ├── speaking/page.tsx     # /speaking
│   ├── about/page.tsx        # /about
│   ├── now/page.tsx          # /now
│   ├── api/
│   │   ├── subscribe/        # POST /api/subscribe → Resend
│   │   └── og/               # GET /api/og?title=... → OG image
│   ├── rss.xml/route.ts      # GET /rss.xml
│   ├── sitemap.ts            # Auto-generated sitemap
│   └── not-found.tsx         # 404 page
├── components/
│   ├── layout/               # Nav, Footer
│   ├── sections/             # NewsletterForm
│   └── ui/                   # ThemeProvider, ThemeToggle, SocialIcon, MdxComponents
├── content/
│   └── posts/                # MDX article files
├── lib/
│   ├── config.ts             # Site constants, nav links, social links
│   ├── posts.ts              # MDX file reading and frontmatter parsing
│   └── utils.ts              # cn(), formatDate(), formatDateLong()
└── styles/
    └── globals.css           # Tailwind v4 entry + CSS custom properties
```

---

## Design tokens

All design tokens are CSS custom properties defined in `src/styles/globals.css`. The component code never contains hardcoded hex values — it always uses `var(--token)`.

**Palette: Zinc + Electric Lime**

| Token          | Dark                     | Light                   | Usage                |
| -------------- | ------------------------ | ----------------------- | -------------------- |
| `--background` | `#0C0C0C`                | `#FFFFFF`               | Page background      |
| `--surface`    | `#161616`                | `#F4F4F5`               | Cards, code blocks   |
| `--elevated`   | `#1F1F1F`                | `#E4E4E7`               | Hover states         |
| `--text`       | `#EDEDED`                | `#111111`               | Body text            |
| `--muted`      | `#888888`                | `#71717A`               | Dates, metadata      |
| `--accent`     | `#A3E635`                | `#65A30D`               | Links, active states |
| `--accent-dim` | `rgba(163,230,53,0.12)`  | `rgba(101,163,13,0.10)` | Badge backgrounds    |
| `--border`     | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.08)`      | Dividers             |

---

## Typography

- **Display / headings**: Bricolage Grotesque (Bold 700/800) — loaded from Google Fonts
- **Body**: Geist — Vercel's font, fits the brand
- **Code / metadata**: Geist Mono

---

## Content: writing articles

Articles are `.mdx` files in `src/content/posts/`. Frontmatter schema:

```mdx
---
title: 'Your Article Title'
date: '2026-03-01'
description: 'One sentence that earns a click in a Google result.'
tags: ['next.js', 'caching']
published: true
---

Article content starts here.
```

To publish: write the file, commit, push. Vercel deploys automatically.

---

## Theme

- Dark by default
- Respects `prefers-color-scheme` on first visit
- Manual toggle stored in `localStorage`
- Flash of wrong theme prevented by inline script in `<head>` (see `layout.tsx`)

---

## Newsletter

Uses Resend. Set `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` in `.env.local`. Copy `.env.example` to get started.

---

## Running locally

```bash
git clone https://github.com/enicaaaa/ena-dodic-dev
cd ena-dodic-dev
npm install
cp .env.example .env.local
# fill in RESEND_API_KEY and RESEND_AUDIENCE_ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Push to `main`. Vercel deploys automatically. Set environment variables in the Vercel dashboard under Project Settings → Environment Variables.
