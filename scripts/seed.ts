/**
 * Seed — migrates the EXISTING repository content into Postgres verbatim.
 *
 * Nothing here is invented. Every row is derived from:
 *   src/lib/destinations.ts   (36 destinations, FAQs auto-generated as before)
 *   src/lib/content.ts        (holiday types, services, blogs, FAQs, stats)
 *   public/gallery/*.jpg      (64 real photographs → media_library, UNPUBLISHED)
 *
 * Tables that would require inventing business facts — guest_gallery and
 * testimonials — are deliberately left EMPTY.
 *
 * Usage:  DATABASE_URL=... ADMIN_PASSWORD=... npm run db:seed
 */
import "dotenv/config";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql as dsql } from "drizzle-orm";

import * as schema from "../src/server/db/schema";
import { destinations as sourceDestinations } from "../src/lib/destinations";
import {
  holidayTypes as sourceHolidayTypes,
  services as sourceServices,
  blogPosts as sourceBlogPosts,
  faqCategories as sourceFaqCategories,
  galleryItems as sourceGalleryItems,
  stats as sourceStats,
  BRAND,
} from "../src/lib/content";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required to seed.");
  process.exit(1);
}

const client = postgres(url, { max: 1 });
const db = drizzle(client, { schema });

/** Parse "12 March 2025"-style dates without inventing a value. */
function parseDate(input?: string): Date | null {
  if (!input) return null;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function main() {
  console.log("→ seeding", url!.replace(/:[^:@]+@/, ":****@"));

  /* ── 1. admin user ─────────────────────────────────────── */
  const adminEmail = process.env.ADMIN_EMAIL ?? BRAND.email;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn(
      "! ADMIN_PASSWORD not set — skipping admin user. " +
        "Set it and re-run to create the first login.",
    );
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db
      .insert(schema.adminUsers)
      .values({
        email: adminEmail,
        passwordHash,
        name: process.env.ADMIN_NAME ?? BRAND.contactPerson ?? "Administrator",
        role: "owner",
      })
      .onConflictDoUpdate({
        target: schema.adminUsers.email,
        set: { passwordHash },
      });
    console.log(`✓ admin user: ${adminEmail}`);
  }

  /* ── 2. destinations (verbatim) ────────────────────────── */
  let destCount = 0;
  for (const [i, d] of sourceDestinations.entries()) {
    await db
      .insert(schema.destinations)
      .values({
        slug: d.slug,
        name: d.name,
        country: d.country,
        region: d.region,
        kind: d.region === "international" ? "international" : "domestic",
        isPrime: Boolean(d.prime),
        ribbon: d.ribbon ?? null,
        tagline: d.tagline,
        overview: d.overview,
        heroImage: d.hero,
        bestTime: d.bestTime,
        bestTimeNote: d.bestTimeNote,
        visa: d.visa ?? null,
        gallery: d.gallery ?? [],
        whyVisit: d.whyVisit ?? [],
        idealFor: (d.idealFor ?? []) as string[],
        attractions: d.attractions ?? [],
        experiences: d.experiences ?? [],
        hotels: d.hotels ?? [],
        related: d.related ?? [],
        faqs: d.faqs ?? [],
        sortOrder: i,
        isPublished: true,
      })
      .onConflictDoNothing({ target: schema.destinations.slug });
    destCount++;
  }
  console.log(`✓ destinations: ${destCount}`);

  /* ── 2b. destination gallery images ────────────────────── */
  const destRows = await db.select().from(schema.destinations);
  const idBySlug = new Map(destRows.map((r) => [r.slug, r.id]));
  let imgCount = 0;
  for (const d of sourceDestinations) {
    const destId = idBySlug.get(d.slug);
    if (!destId) continue;
    for (const [j, url] of (d.gallery ?? []).entries()) {
      await db
        .insert(schema.destinationImages)
        .values({
          destinationId: destId,
          url,
          alt: `${d.name} — ${d.country}`,
          sortOrder: j,
        })
        .onConflictDoNothing();
      imgCount++;
    }
  }
  console.log(`✓ destination_images: ${imgCount}`);

  /* ── 3. holiday types ──────────────────────────────────── */
  for (const [i, h] of sourceHolidayTypes.entries()) {
    await db
      .insert(schema.holidayTypes)
      .values({
        slug: h.slug,
        name: h.name,
        blurb: h.blurb,
        intro: h.intro,
        image: h.image,
        icon: h.icon,
        highlights: h.highlights ?? [],
        suited: h.suited ?? [],
        sortOrder: i,
      })
      .onConflictDoNothing({ target: schema.holidayTypes.slug });
  }
  console.log(`✓ holiday_types: ${sourceHolidayTypes.length}`);

  /* ── 4. services ───────────────────────────────────────── */
  for (const [i, s] of sourceServices.entries()) {
    await db
      .insert(schema.services)
      .values({
        slug: s.slug,
        title: s.title,
        kicker: s.kicker,
        intro: s.intro,
        hero: s.hero,
        sections: s.sections ?? [],
        faqs: s.faqs ?? [],
        sortOrder: i,
      })
      .onConflictDoNothing({ target: schema.services.slug });
  }
  console.log(`✓ services: ${sourceServices.length}`);

  /* ── 5. blogs ──────────────────────────────────────────── */
  for (const b of sourceBlogPosts) {
    await db
      .insert(schema.blogs)
      .values({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        body: b.body ?? [],
        coverImage: b.image,
        category: b.category,
        readTime: b.readTime,
        displayDate: b.date,
        publishedAt: parseDate(b.date),
        isPublished: true,
      })
      .onConflictDoNothing({ target: schema.blogs.slug });
  }
  console.log(`✓ blogs: ${sourceBlogPosts.length}`);

  /* ── 6. faqs ───────────────────────────────────────────── */
  let faqCount = 0;
  for (const cat of sourceFaqCategories) {
    for (const [i, item] of cat.items.entries()) {
      await db.insert(schema.faqs).values({
        category: cat.name,
        question: item.q,
        answer: item.a,
        sortOrder: i,
      });
      faqCount++;
    }
  }
  console.log(`✓ faqs: ${faqCount}`);

  /* ── 7. gallery categories ─────────────────────────────── */
  // Derived from the `group` values already used in content.ts, plus a
  // holding category for the office photographs awaiting classification.
  const groups = Array.from(
    new Set(sourceGalleryItems.map((g) => g.group)),
  ) as string[];
  const categoryLabels = [...groups, "Our Office"];
  for (const [i, label] of categoryLabels.entries()) {
    await db
      .insert(schema.galleryCategories)
      .values({
        slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        label,
        sortOrder: i,
      })
      .onConflictDoNothing({ target: schema.galleryCategories.slug });
  }
  console.log(`✓ gallery_categories: ${categoryLabels.length}`);

  /* ── 8. media_library — the 64 real photographs ────────── */
  // Imported UNPUBLISHED and uncategorised. These are a mix of office,
  // team and travel photographs; only the owner can correctly label them,
  // so we make no claim about their subject matter.
  let mediaCount = 0;
  try {
    const dir = join(process.cwd(), "public", "gallery");
    const files = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    for (const f of files.sort()) {
      await db
        .insert(schema.mediaLibrary)
        .values({
          url: `/gallery/${f}`,
          filename: f,
          mimeType: f.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg",
          folder: "gallery-import",
          alt: "",
          caption: null,
          isPublished: false,
        })
        .onConflictDoNothing();
      mediaCount++;
    }
  } catch (e) {
    console.warn("! could not read public/gallery:", (e as Error).message);
  }
  console.log(`✓ media_library: ${mediaCount} (unpublished, awaiting categorisation)`);

  /* ── 9. site settings ──────────────────────────────────── */
  const settings: {
    key: string;
    value: string;
    label: string;
    group: string;
    notes?: string;
  }[] = [
    ...sourceStats.map((s, i) => ({
      key: `stat_${i + 1}`,
      value: JSON.stringify({ value: s.value, label: s.label }),
      label: `Homepage stat ${i + 1}: ${s.label}`,
      group: "stats",
      notes:
        s.value === "50k+"
          ? "UNVERIFIED — this figure could not be substantiated from any source. Confirm or remove before launch."
          : undefined,
    })),
    {
      key: "tagline_primary",
      value: "We Take You to the World's Most Beautiful Destinations",
      label: "Primary tagline",
      group: "brand",
    },
    {
      key: "tagline_secondary",
      value: "Your Journey. Our Expertise.",
      label: "Secondary motto",
      group: "brand",
      notes:
        "Did not appear anywhere in the original site. Used only as a low-emphasis sign-off. Confirm with owner.",
    },
    {
      key: "instagram_url",
      value: "https://instagram.com/royal_rajasthan_holidays",
      label: "Instagram profile",
      group: "social",
    },
    {
      key: "facebook_url",
      value: "",
      label: "Facebook page",
      group: "social",
      notes:
        'Page is known to exist under the name "Prakash Arora" but the exact URL is unconfirmed. Left blank rather than guessing.',
    },
  ];

  for (const s of settings) {
    await db
      .insert(schema.siteSettings)
      .values({
        key: s.key,
        value: s.value,
        label: s.label,
        group: s.group,
        notes: s.notes ?? null,
      })
      .onConflictDoUpdate({
        target: schema.siteSettings.key,
        set: { value: s.value, label: s.label, notes: s.notes ?? null },
      });
  }
  console.log(`✓ site_settings: ${settings.length}`);

  /* ── 10. intentionally empty ───────────────────────────── */
  const [{ count: guestCount }] = await db
    .select({ count: dsql<number>`count(*)::int` })
    .from(schema.guestGallery);
  const [{ count: testimonialCount }] = await db
    .select({ count: dsql<number>`count(*)::int` })
    .from(schema.testimonials);
  console.log(
    `✓ guest_gallery: ${guestCount} · testimonials: ${testimonialCount} ` +
      "(intentionally empty — real content only)",
  );

  await client.end();
  console.log("\nSeed complete.");
}

main().catch(async (e) => {
  console.error(e);
  await client.end();
  process.exit(1);
});
