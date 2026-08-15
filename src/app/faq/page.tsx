import type { Metadata } from "next";
import { Faq } from "@/views/Content";
import { faqCategories } from "@/lib/content";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers on booking, visas, hotels, flights, payments, cancellations and travelling with Royal Rajasthan Holidays.",
  path: "/faq",
  image: IMG.sg5,
});

/** FAQPage structured data — preserved verbatim from useSeo(). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((c) =>
    c.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  ),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <Faq />
    </>
  );
}
