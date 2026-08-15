import type { Metadata } from "next";

/**
 * Server-side SEO.
 *
 * Every title/description here is copied VERBATIM from the original
 * `useSeo({...})` call in the corresponding page component, so search-engine
 * output is unchanged by the migration — it is now emitted in the server HTML
 * instead of being injected on the client after hydration.
 */

export const SITE = "https://www.royalrajasthanholidays.com";

export const SITE_NAME = "Royal Rajasthan Holidays";

/** Matches the original template: `${title} | Royal Rajasthan Holidays` */
export function pageTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

export interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/**
 * Builds a Next.js Metadata object equivalent to what useSeo() used to inject
 * (title, description, canonical, OG, Twitter).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: SeoInput): Metadata {
  const full = pageTitle(title);
  const url = `${SITE}${path}`;

  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Renders a JSON-LD <script> payload. Used by pages that had `jsonLd` in useSeo. */
export function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
