# ROYAL RAJASTHAN HOLIDAYS — Luxury Travel Platform

> **We Take You to the World's Most Beautiful Destinations**

A production-ready, enterprise-grade luxury travel website for Royal Rajasthan Holidays —
36 destinations, 11 holiday types, 4 travel services, journal, gallery, FAQ and an
enquiry-first CTA architecture. **Prices are never displayed.**

---

## Official business information

All business details live in a single source of truth: **`BRAND` in `src/lib/content.ts`**.
Every page, component, footer, form, email template, schema block and metadata tag reads
from it — update once, and the change propagates site-wide.

| Field | Value |
| --- | --- |
| Company name | ROYAL RAJASTHAN HOLIDAYS |
| Tagline | We Take You to the World's Most Beautiful Destinations |
| Established | Since 2005 |
| Office address | D Road, Sardarpura, Jodhpur, Rajasthan, India |
| Office hours | Monday – Saturday, 11:00 AM – 08:00 PM |
| Sunday | Closed |
| Contact person | Prakash Arora |
| Phone | +91 94141 96978 |
| WhatsApp | +91 94141 96978 |
| Email | royalrajasthanjodhpur@gmail.com |

These values are also mirrored in `index.html` (JSON-LD, Open Graph, Twitter, geo meta),
`public/manifest.json`, `public/robots.txt` and `public/sitemap.xml`.

---

## 1. Front-end (this repository)

| Item | Value |
| --- | --- |
| Framework | React 19 + Vite 7 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Motion | Framer Motion + Lenis smooth scrolling + scroll parallax |
| Routing | React Router (hash router — deploys to any static host) |
| Icons | lucide-react |
| Fonts | Playfair Display (headings) · Inter (body / buttons) |

### Commands

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview the production build
```

### Brand tokens (`src/index.css`)

| Token | Hex |
| --- | --- |
| `--color-royal` | `#1E4E8C` |
| `--color-ocean` | `#2C6BAA` |
| `--color-gold` | `#D4B25A` |
| `--color-gold-soft` | `#E7C977` |
| `--color-ivory` | `#FFFDF8` |
| `--color-beige` | `#F7F4EE` |
| `--color-slateluxe` | `#56616B` |
| `--color-charcoal` | `#202124` |
| `--color-emeraldluxe` | `#2D8C7C` |

### Uploaded assets

| Asset | Where it goes |
| --- | --- |
| Official logo | `public/logo.png` — used automatically, never redesigned or recoloured |
| Destination photos | replace the URLs in `src/lib/media.ts` with `/images/<name>.jpg` |
| Office / team photos | `src/pages/About.tsx` → `team` array, and `src/lib/content.ts` → `galleryItems` |
| Google Reviews | `src/lib/content.ts` → `verifiedReviews` (empty by default — **never fabricate reviews**) |

---

## 2. Content architecture

```
src/lib/destinations.ts   36 destinations (20 international incl. 9 Prime, 16 India)
src/lib/content.ts        brand, holiday types, services, blog, FAQ, gallery, reviews
src/lib/media.ts          central image library — swap for uploaded assets
src/lib/useSeo.ts         per-route title, meta, Open Graph, canonical + JSON-LD
```

**⭐ Prime Group Destinations** (Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia,
Bhutan, Nepal, Sri Lanka) receive visual priority in the mega menu, the homepage hero
rotation, a dedicated homepage section with "Most Popular Group Tours" ribbons, the
enquiry form and the footer — with equal emphasis between them.

### Routes

`/` · `/about` · `/destinations` · `/destinations/international` · `/destinations/domestic` ·
`/destination/:slug` · `/holidays` · `/holidays/:slug` · `/visa` · `/hotels` · `/flights` ·
`/cruises` · `/gallery` · `/blog` · `/blog/:slug` · `/guest-stories` · `/faq` · `/contact` ·
`/privacy` · `/terms` · `/sitemap` · `/thank-you` · `/404`

---

## 3. Backend blueprint (Next.js + Neon + Drizzle)

The enquiry form posts to `POST /api/enquiries` and degrades gracefully when no API is
present (the lead is queued in `localStorage` and the user still reaches `/thank-you`).

### Critical database rules

1. **Never initialise the database during build.** No top-level `drizzle()` call in any
   module imported by a page.
2. **Lazy-load only inside API routes / server actions:**

   ```ts
   // lib/db.ts
   import { drizzle } from "drizzle-orm/neon-http";
   import { neon } from "@neondatabase/serverless";

   let _db: ReturnType<typeof drizzle> | null = null;

   export function getDb() {
     if (!process.env.DATABASE_URL) {
       throw new Error("DATABASE_URL is not configured");
     }
     if (!_db) _db = drizzle(neon(process.env.DATABASE_URL));
     return _db;
   }
   ```

3. Marketing pages must build successfully **without** `DATABASE_URL`.
4. Only database-dependent API routes should require it.

### Schema (normalised, FK + indexes + timestamps)

`users` · `roles` · `destinations` · `holiday_types` · `packages` · `enquiries` ·
`contact_messages` · `newsletter_subscribers` · `reviews` · `blogs` · `gallery` ·
`media_library` · `seo_metadata` · `settings`

`enquiries` columns: `id`, `name`, `email`, `phone`, `destination_id` → `destinations.id`,
`holiday_type_id` → `holiday_types.id`, `travellers`, `travel_date`, `message`, `source`,
`status` (`new | follow_up | confirmed | cancelled`), `assigned_to` → `users.id`,
`whatsapp_clicks`, `notes`, `created_at`, `updated_at`.
Indexes on `status`, `created_at`, `assigned_to`, `email`.

### Admin CRM

Lead dashboard · status pipeline (New / Follow-up / Confirmed / Cancelled) · lead
assignment · notes · search & filters · CSV / Excel export · WhatsApp click tracking ·
email notifications · dashboard analytics.

---

## 4. Deployment — GitHub → Vercel → Neon → GoDaddy

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Create a Neon PostgreSQL database and copy the pooled connection string.
4. Add `DATABASE_URL` (and the rest of `.env.example`) to Vercel environment variables.
5. Run Drizzle migrations: `npx drizzle-kit push`.
6. Redeploy.
7. Add the GoDaddy custom domain in Vercel and update the DNS records.
8. Verify SSL, the production build and all routes.

---

## 5. Production checklist

- [x] `npm run build` passes
- [x] No TypeScript errors
- [x] No console errors
- [x] Responsive: mobile / tablet / desktop
- [x] Header, mega menu and footer verified at every breakpoint
- [x] Enquiry form validation + WhatsApp CTA on every page
- [x] SEO metadata, Open Graph, canonical + JSON-LD per route
- [x] `robots.txt`, HTML sitemap page, legal pages, 404 and thank-you pages
- [x] WCAG 2.2 AA: semantic HTML, ARIA labels, skip link, visible focus states,
      keyboard navigation, `prefers-reduced-motion` support
- [x] Lazy-loaded imagery, blur-up loading, preconnect hints
- [x] No prices displayed anywhere · no fabricated reviews
- [x] Official business information verified site-wide — Jodhpur only, Since 2005,
      Mon–Sat 11:00 AM–08:00 PM, Sunday Closed, Prakash Arora,
      +91 94141 96978, royalrajasthanjodhpur@gmail.com
