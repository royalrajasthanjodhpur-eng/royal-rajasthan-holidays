import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Layout } from "@/components/Layout";
import { BRAND } from "@/lib/content";
import { SITE } from "@/lib/seo";
import "@/index.css";

/**
 * Root layout — carries over the complete <head> from the original index.html.
 * Every meta tag, the font links and the TravelAgency JSON-LD are preserved.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Royal Rajasthan Holidays | Luxury International & India Holidays",
    template: "%s",
  },
  description:
    "Royal Rajasthan Holidays, Jodhpur — bespoke luxury journeys across Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka and all of India. Enquire for a customised itinerary.",
  authors: [{ name: "Royal Rajasthan Holidays" }],
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jodhpur, Rajasthan, India",
    "business:contact_data:street_address": BRAND.street,
    "business:contact_data:locality": BRAND.city,
    "business:contact_data:region": BRAND.state,
    "business:contact_data:country_name": BRAND.country,
    "business:contact_data:phone_number": BRAND.phone,
    "business:contact_data:email": BRAND.email,
  },
  openGraph: {
    type: "website",
    siteName: "Royal Rajasthan Holidays",
    locale: "en_IN",
    title: "Royal Rajasthan Holidays | Luxury Travel, Beautifully Curated",
    description:
      "We Take You to the World's Most Beautiful Destinations. Bespoke international and domestic holidays, designed from Jodhpur since 2005.",
    url: SITE + "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Rajasthan Holidays | Luxury Travel, Beautifully Curated",
    description:
      "We Take You to the World's Most Beautiful Destinations. Bespoke journeys designed from Jodhpur, Rajasthan since 2005.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E4E8C",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organisation JSON-LD, preserved verbatim from index.html.
 * `sameAs` now carries the confirmed Instagram profile. The Facebook page is
 * known to exist under the name "Prakash Arora" but its exact URL has not been
 * confirmed by the owner, so it is omitted rather than guessed.
 */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BRAND.legalName,
  slogan: BRAND.tagline,
  url: `${SITE}/`,
  telephone: "+91-9414196978",
  email: BRAND.email,
  foundingDate: String(BRAND.established),
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.street,
    addressLocality: BRAND.city,
    addressRegion: BRAND.state,
    addressCountry: BRAND.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    name: BRAND.contactPerson,
    telephone: "+91-9414196978",
    email: BRAND.email,
    availableLanguage: ["en", "hi"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "11:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://instagram.com/royal_rajasthan_holidays",
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://images.pexels.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Script
          id="organisation-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
