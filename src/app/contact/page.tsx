import type { Metadata } from "next";
import { Contact } from "@/views/Utility";
import { BRAND } from "@/lib/content";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Talk to a Travel Expert",
  description:
    "Call, WhatsApp, email or visit Royal Rajasthan Holidays at D Road, Sardarpura, Jodhpur, Rajasthan. Speak with Prakash Arora for a customised itinerary.",
  path: "/contact",
  image: IMG.raj1,
});

/** TravelAgency structured data — preserved verbatim from useSeo(). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BRAND.legalName,
  telephone: BRAND.phoneRaw,
  email: BRAND.email,
  foundingDate: String(BRAND.established),
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
    telephone: BRAND.phoneRaw,
    email: BRAND.email,
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
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <Contact />
    </>
  );
}
