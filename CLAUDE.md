# Service Business Website Template

Base template for MYTYsolution website printing press.
Produces SEO-optimized, bilingual (EN/ES) websites for service businesses.

## Stack

- Next.js 16.2+ (App Router, Turbopack)
- React 19, TypeScript 5
- Tailwind CSS 4 (@theme directive, NO tailwind.config.js)
- next-intl (i18n — English + Spanish)
- Supabase (database, form submissions)
- Resend (transactional email)
- Lucide React (icons)
- Railway deployment (standalone output)

## Architecture

### Routing — all pages under app/[locale]/

```
app/
  [locale]/layout.tsx           — root layout: fonts, metadata, providers
  [locale]/page.tsx             — home
  [locale]/services/page.tsx    — services overview
  [locale]/services/[slug]/page.tsx — individual service
  [locale]/about/page.tsx
  [locale]/contact/page.tsx
  [locale]/blog/page.tsx        — blog listing
  [locale]/blog/[slug]/page.tsx — blog post
  api/health/route.ts           — Railway health check
  sitemap.ts                    — dynamic sitemap generation
  robots.ts                     — robots.txt
```

### i18n (next-intl)

- Config: `i18n/config.ts` (locales, defaultLocale)
- Message loader: `i18n/request.ts`
- Messages: `messages/en.json`, `messages/es.json`
- Server components: `const t = await getTranslations('namespace')`
- Client components: `const t = useTranslations('namespace')`

### Styling (Tailwind CSS 4)

Brand theming lives in the `@theme` block in `app/globals.css`.
NO tailwind.config.js — Tailwind 4 configures via CSS.

```css
@theme {
  --color-primary: #2563eb;
  --font-heading: 'Inter', sans-serif;
}
```

### Content sources

1. `config/site.ts` — site metadata, contact info, social links
2. `content/` — markdown page copy and blog posts (build-time)
3. Supabase — dynamic data (form submissions, optional CMS)

### SEO

- `generateMetadata()` on EVERY page — never skip
- `StructuredData` component for JSON-LD per page
- Dynamic `sitemap.ts` and `robots.ts`
- `next/image` for all images (WebP/AVIF auto-optimization)
- `next/font` for fonts (zero layout shift)

## Section Components (components/sections/)

All follow this interface:

```typescript
interface SectionProps {
  id: string;
  className?: string;
}
```

| Component | Variants | Purpose |
|-----------|----------|---------|
| Hero | centered, split, image-bg | Page hero with headline, CTA |
| ServicesGrid | 2-col, 3-col | Service cards with icons |
| Testimonials | grid, carousel | Client testimonials |
| FAQ | accordion | Frequently asked questions |
| CTA | banner, inline | Call-to-action |
| ContactForm | simple, detailed | Server Action → Supabase + Resend |
| TeamGrid | grid | Team member cards |
| BlogPreview | grid | Latest blog posts |
| MapEmbed | — | Google Maps iframe |

## UI Components (components/ui/)

Button, Card, Container, Section, Input, Textarea, Badge

## Config (config/)

- `site.ts` — name, description, contact, social
- `navigation.ts` — nav items per locale

## Developer Agent Assembly Sequence

1. Read `architecture_spec.json` → route map, rendering strategy
2. Read `brand_system.json` → paste colors/fonts into `@theme`
3. Read `design_spec.json` → layout composition per page
4. Read content markdown → map to section component props
5. Read `asset_manifest.json` → place images
6. Read `seo_strategy.json` → metadata + structured data
7. Wire integrations per architecture spec
8. `npm run build` — zero errors required
9. Lighthouse self-test — perf 90+, a11y 95+, seo 95+
10. Write `BUILD_MANIFEST.md`, commit, push

## Conventions

- Server Components by default — `'use client'` only when needed
- `next/image` for ALL images, `next/link` for ALL internal links
- Forms via Server Actions (no API routes for simple forms)
- All visible text must exist in both locale message files
- generateMetadata() + StructuredData on every page

## Commands

```bash
npm run dev     # Dev server (Turbopack)
npm run build   # Production build (standalone)
npm run start   # Production server
npm run lint    # ESLint
```

## Railway Deployment

`output: 'standalone'` in next.config.ts
- Build: `npm run build`
- Start: `node .next/standalone/server.js`
- Health: GET `/api/health`
- Env vars: see `.env.example`
