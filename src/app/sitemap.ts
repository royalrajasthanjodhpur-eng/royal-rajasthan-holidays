import type { MetadataRoute } from "next";
import { desc, eq } from "drizzle-orm";

import { SITE } from "@/lib/seo";
import { tryDb, schema } from "@/server/db/client";
import { destinations as staticDestinations } from "@/lib/destinations";
import { holidayTypes, services, blogPosts } from "@/lib/content";

/**
 * Machine-readable sitemap at /sitemap.xml.
 *
 * Generated from the live database when DATABASE_URL is configured, falling
 * back to the static content modules so the sitemap is always correct even
 * during a build without database access.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: `${SITE}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE}/destinations`, priority: 0.9, changeFrequency: "weekly" },
    {
      url: `${SITE}/destinations/international`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${SITE}/destinations/domestic`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    { url: `${SITE}/holidays`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE}/visa`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE}/hotels`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE}/flights`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE}/cruises`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE}/gallery`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${SITE}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${SITE}/guest-stories`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${SITE}/faq`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE}/contact`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE}/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE}/terms`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE}/sitemap-page`, priority: 0.3, changeFrequency: "monthly" },
  ] as const).map((r) => ({ ...r, lastModified: now }));

  // Destinations — live table first, static module as fallback.
  const destRows = await tryDb(
    (db) =>
      db
        .select({
          slug: schema.destinations.slug,
          updatedAt: schema.destinations.updatedAt,
        })
        .from(schema.destinations)
        .where(eq(schema.destinations.isPublished, true))
        .orderBy(desc(schema.destinations.updatedAt)),
    staticDestinations.map((d) => ({ slug: d.slug, updatedAt: now })),
  );

  const destinationRoutes: MetadataRoute.Sitemap = destRows.map((d) => ({
    url: `${SITE}/destination/${d.slug}`,
    lastModified: d.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRows = await tryDb(
    (db) =>
      db
        .select({
          slug: schema.blogs.slug,
          publishedAt: schema.blogs.publishedAt,
        })
        .from(schema.blogs)
        .where(eq(schema.blogs.isPublished, true)),
    blogPosts.map((p) => ({ slug: p.slug, publishedAt: now })),
  );

  const blogRoutes: MetadataRoute.Sitemap = blogRows.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.publishedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const holidayRows = await tryDb(
    (db) =>
      db
        .select({ slug: schema.holidayTypes.slug })
        .from(schema.holidayTypes)
        .where(eq(schema.holidayTypes.isPublished, true)),
    holidayTypes.map((h) => ({ slug: h.slug })),
  );

  const holidayRoutes: MetadataRoute.Sitemap = holidayRows.map((h) => ({
    url: `${SITE}/holidays/${h.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Service slugs are fixed routes; referenced here for completeness.
  void services;

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...holidayRoutes,
    ...blogRoutes,
  ];
}
