import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CtaBand, PageHero } from "../components/blocks";
import { EnquiryForm } from "../components/EnquiryForm";
import { Button, Container, GoldRule, Kicker, Reveal, Section, SectionHeading } from "../components/ui";
import { BRAND, holidayTypes, services, waLink } from "../lib/content";
import { destinations } from "../lib/destinations";
import { IMG } from "../lib/media";
import { useSeo } from "../lib/useSeo";

/* ───────────── CONTACT ───────────── */

export function Contact() {
  useSeo({
    title: "Contact Us — Talk to a Travel Expert",
    description:
      "Call, WhatsApp, email or visit Royal Rajasthan Holidays at D Road, Sardarpura, Jodhpur, Rajasthan. Speak with Prakash Arora for a customised itinerary.",
    path: "/contact",
    image: IMG.raj1,
    jsonLd: {
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
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "20:00",
        },
      ],
    },
  });

  const cards = [
    {
      icon: Phone,
      title: "Call our office",
      lines: [BRAND.phone, `Ask for ${BRAND.contactPerson}`],
      href: `tel:${BRAND.phoneRaw}`,
      cta: "Call now",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      lines: [BRAND.phone, "Fastest way to reach us"],
      href: waLink("Hello Royal Rajasthan Holidays, I would like to plan a journey."),
      cta: "Start a chat",
      external: true,
    },
    {
      icon: Mail,
      title: "Email us",
      lines: [BRAND.email],
      href: `mailto:${BRAND.email}`,
      cta: "Send an email",
    },
    {
      icon: MapPin,
      title: "Visit our office",
      lines: [BRAND.address],
      href: `https://maps.google.com/?q=${BRAND.mapsQuery}`,
      cta: "Open in Maps",
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's begin with a conversation"
        intro="Tell us who is travelling and when. A dedicated travel designer will reply — usually within one working day."
        image={IMG.raj1}
        crumbs={[{ label: "Contact" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i}>
                <div className="flex h-full flex-col rounded-[24px] bg-white p-7 ring-1 ring-royal/8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-50 text-royal">
                    <c.icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg text-charcoal">{c.title}</h2>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-2 flex-1 text-[14px] leading-relaxed text-slateluxe">
                      {l}
                    </p>
                  ))}
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-5 text-[13px] font-semibold text-royal underline underline-offset-4"
                  >
                    {c.cta} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Kicker>Enquiry Form</Kicker>
              <h2 className="mt-5 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Get a customised itinerary
              </h2>
              <GoldRule className="mt-6 w-24" />
              <p className="mt-5 text-[16px] leading-relaxed text-slateluxe">
                We never publish package prices, because a genuine quotation depends on your dates, group
                size, hotel category and how you like to travel. Share a few details and we will send a
                proper, itemised proposal.
              </p>

              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white p-7 ring-1 ring-royal/8">
                  <h3 className="flex items-center gap-2 font-display text-xl text-charcoal">
                    <MapPin aria-hidden className="h-5 w-5 text-gold" /> Our office
                  </h3>
                  <address className="mt-4 text-[14.5px] leading-relaxed text-slateluxe not-italic">
                    {BRAND.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <p className="mt-4 border-t border-royal/8 pt-4 text-[14.5px] text-slateluxe">
                    Contact person
                    <span className="mt-0.5 block font-semibold text-charcoal">
                      {BRAND.contactPerson}
                    </span>
                  </p>
                </div>

                <div className="rounded-[24px] bg-white p-7 ring-1 ring-royal/8">
                  <h3 className="flex items-center gap-2 font-display text-xl text-charcoal">
                    <Clock aria-hidden className="h-5 w-5 text-gold" /> Business hours
                  </h3>
                  <dl className="mt-4 space-y-2 text-[14.5px]">
                    {BRAND.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4">
                        <dt className="text-slateluxe">{h.day}</dt>
                        <dd className="font-medium text-charcoal">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 border-t border-royal/8 pt-4 text-[13.5px] text-slateluxe">
                    Closed on Sundays — WhatsApp us anytime and we will reply the next working day.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[24px] ring-1 ring-royal/10">
                <iframe
                  title="Royal Rajasthan Holidays office — D Road, Sardarpura, Jodhpur, Rajasthan"
                  src={`https://www.google.com/maps?q=${BRAND.mapsQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[320px] w-full border-0"
                />
              </div>
            </div>

            <Reveal delay={1}>
              <EnquiryForm />
            </Reveal>
          </div>

          {/* Google Business Profile */}
          <Reveal delay={1}>
            <div className="mt-16 grid items-center gap-8 rounded-[24px] border border-royal/10 bg-white p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-bold tracking-[0.22em] text-gold-ink uppercase">
                  Google Business Profile
                </p>
                <h2 className="mt-3 font-display text-2xl text-charcoal">
                  Find us on Google — {BRAND.city}, {BRAND.state}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slateluxe">
                  {BRAND.legalName}, {BRAND.address}. Open {BRAND.hours[0].day},{" "}
                  {BRAND.hours[0].time} · Sunday {BRAND.hours[1].time}. All reviews on our profile are
                  written by real travellers — we never publish testimonials of our own.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${BRAND.mapsQuery}`}
                  external
                  variant="outline"
                >
                  View on Google Maps
                </Button>
                <Button
                  href="https://www.google.com/search?q=Royal+Rajasthan+Holidays+Jodhpur+reviews"
                  external
                  variant="outline"
                >
                  Read Google Reviews
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

/* ───────────── THANK YOU ───────────── */

export function ThankYou() {
  useSeo({
    title: "Thank You — Your Enquiry Has Been Received",
    description: "Thank you for contacting Royal Rajasthan Holidays. A travel designer will be in touch shortly.",
    path: "/thank-you",
  });

  const { state } = useLocation() as { state?: { name?: string } };

  return (
    <>
      <PageHero
        kicker="Enquiry Received"
        title={state?.name ? `Thank you, ${state.name.split(" ")[0]}.` : "Thank you."}
        intro="Your enquiry has reached our travel design team. We usually respond within one working day."
        image={IMG.mld2}
        crumbs={[{ label: "Thank You" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle2 aria-hidden className="mx-auto h-14 w-14 text-emeraldluxe" />
            <h2 className="mt-6 font-display text-3xl text-charcoal">What happens next</h2>
            <ol className="mt-8 space-y-5 text-left">
              {[
                "A travel designer reviews your requirements and may call to understand your plans better.",
                "You receive a personalised draft itinerary with hotels, inclusions and an itemised quotation.",
                "We refine the plan together — as many revisions as you need — before anything is confirmed.",
                "Once confirmed, we handle bookings, documentation and 24×7 support throughout your journey.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4 rounded-[20px] bg-white p-5 ring-1 ring-royal/8">
                  <span className="font-display text-2xl text-gold-ink">{i + 1}</span>
                  <p className="text-[15px] leading-relaxed text-slateluxe">{s}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href={waLink("Hello, I just submitted an enquiry on your website.")}
                external
                variant="gold"
              >
                <MessageCircle aria-hidden className="h-4 w-4" /> Continue on WhatsApp
              </Button>
              <Button to="/destinations" variant="outline">
                Keep Exploring Destinations
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ───────────── 404 ───────────── */

export function NotFound() {
  useSeo({
    title: "Page Not Found",
    description: "The page you are looking for could not be found.",
    path: "/404",
  });

  return (
    <>
      <PageHero
        kicker="404"
        title="This route doesn't appear on our map"
        intro="The page you were looking for has moved or no longer exists. Let us help you find your way."
        image={IMG.him4}
        crumbs={[{ label: "Not Found" }]}
      />
      <Section tone="ivory">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl text-charcoal">Popular places to go next</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/">Home</Button>
              <Button to="/destinations" variant="outline">
                All Destinations
              </Button>
              <Button to="/holidays" variant="outline">
                Holiday Types
              </Button>
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

/* ───────────── LEGAL ───────────── */

const legalContent: Record<string, { title: string; updated: string; blocks: { h: string; p: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: January 2026",
    blocks: [
      {
        h: "Information we collect",
        p: [
          "We collect the information you provide through our enquiry, newsletter and contact forms — typically your name, email address, phone number, destination interest, travel dates and any details you choose to share about your trip.",
          "For confirmed bookings we additionally collect passport details, dates of birth and other documentation required by airlines, hotels, insurers and consular authorities.",
        ],
      },
      {
        h: "How we use your information",
        p: [
          "Your information is used solely to respond to your enquiry, prepare itineraries and quotations, complete bookings, process visa applications where instructed, and provide support during your journey.",
          "With your consent we may send occasional travel newsletters. You can unsubscribe at any time using the link in every email.",
        ],
      },
      {
        h: "Sharing your information",
        p: [
          "We share only the minimum information necessary with airlines, hotels, transport operators, insurers, consulates and ground partners to fulfil your booking.",
          "We never sell, rent or trade your personal data with third parties for marketing purposes.",
        ],
      },
      {
        h: "Data security and retention",
        p: [
          "We apply reasonable technical and organisational safeguards to protect your data, and retain booking records only as long as required for legal, tax and service purposes.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You may request access to, correction of, or deletion of your personal information at any time by writing to us at the email address published on our contact page.",
        ],
      },
      {
        h: "Cookies and analytics",
        p: [
          "Our website may use cookies and analytics tools to understand how visitors use the site so we can improve it. You can control cookies through your browser settings.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "Last updated: January 2026",
    blocks: [
      {
        h: "About these terms",
        p: [
          "These terms govern the use of this website and the travel arrangement services provided by Royal Rajasthan Holidays. Specific booking terms are set out in the written proposal issued for your journey and take precedence where they differ.",
        ],
      },
      {
        h: "Quotations and pricing",
        p: [
          "We do not publish package prices on this website. All quotations are prepared individually, are valid only for the period stated, and are subject to availability at the time of confirmation.",
          "Prices may be revised prior to confirmation due to changes in airfares, hotel tariffs, currency exchange rates, taxes or government levies.",
        ],
      },
      {
        h: "Bookings and payments",
        p: [
          "A booking is confirmed only upon receipt of the stated advance and our written confirmation. Balance payments are due as per the schedule set out in your proposal.",
          "All payments must be made to our registered company account. We issue a GST-compliant invoice for every transaction.",
        ],
      },
      {
        h: "Cancellations and amendments",
        p: [
          "Cancellation and amendment charges depend on the airlines, hotels and operators involved in your specific itinerary. The applicable terms are disclosed in your proposal before payment.",
        ],
      },
      {
        h: "Visas, passports and health",
        p: [
          "Obtaining a valid passport, visa and any required health documentation remains the traveller's responsibility. We provide assistance and guidance but cannot guarantee the outcome of any visa or immigration decision.",
        ],
      },
      {
        h: "Liability",
        p: [
          "We act as an agent for airlines, hotels, transport providers and other suppliers. We are not liable for loss, delay, injury or damage arising from the acts or omissions of these independent suppliers, or from events beyond reasonable control.",
          "We strongly recommend comprehensive travel insurance for every journey.",
        ],
      },
      {
        h: "Content and imagery",
        p: [
          "Destination photography on this website is illustrative. Hotel rooms, views and inclusions are confirmed individually in your written proposal.",
        ],
      },
    ],
  },
};

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const c = legalContent[kind];
  useSeo({
    title: c.title,
    description: `${c.title} for Royal Rajasthan Holidays.`,
    path: `/${kind}`,
  });

  return (
    <>
      <PageHero kicker="Legal" title={c.title} intro={c.updated} image={IMG.sg1} crumbs={[{ label: c.title }]} />
      <Section tone="ivory">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {c.blocks.map((b) => (
              <Reveal key={b.h}>
                <div>
                  <h2 className="font-display text-2xl text-charcoal">{b.h}</h2>
                  <GoldRule className="mt-4 w-16" />
                  {b.p.map((para, i) => (
                    <p key={i} className="mt-4 text-[16px] leading-[1.8] text-slateluxe">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
            <div className="rounded-[24px] bg-white p-7 ring-1 ring-royal/8">
              <p className="text-[15px] leading-relaxed text-slateluxe">
                Questions about this policy? Write to{" "}
                <a href={`mailto:${BRAND.email}`} className="font-semibold text-royal underline underline-offset-4">
                  {BRAND.email}
                </a>{" "}
                or call {BRAND.phone}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

/* ───────────── SITEMAP ───────────── */

export function Sitemap() {
  useSeo({
    title: "Sitemap",
    description: "A complete index of every page on the Royal Rajasthan Holidays website.",
    path: "/sitemap",
  });

  const groups = [
    {
      title: "Main",
      links: [
        { label: "Home", to: "/" },
        { label: "About Us", to: "/about" },
        { label: "Gallery", to: "/gallery" },
        { label: "Blog", to: "/blog" },
        { label: "Guest Stories", to: "/guest-stories" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Services",
      links: services.map((s) => ({ label: s.title, to: `/${s.slug}` })),
    },
    {
      title: "Holiday Types",
      links: holidayTypes.map((h) => ({ label: h.name, to: `/holidays/${h.slug}` })),
    },
    {
      title: "International Destinations",
      links: destinations
        .filter((d) => d.region === "international")
        .map((d) => ({ label: d.name, to: `/destination/${d.slug}` })),
    },
    {
      title: "India Destinations",
      links: destinations
        .filter((d) => d.region === "domestic")
        .map((d) => ({ label: d.name, to: `/destination/${d.slug}` })),
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms & Conditions", to: "/terms" },
        { label: "Sitemap", to: "/sitemap" },
      ],
    },
  ];

  return (
    <>
      <PageHero
        kicker="Sitemap"
        title="Everything on this website"
        intro="A complete index of destinations, holiday types, services and company pages."
        image={IMG.sg6}
        crumbs={[{ label: "Sitemap" }]}
      />
      <Section tone="ivory">
        <Container>
          <SectionHeading kicker="Index" title="Browse every page" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={i % 3}>
                <div>
                  <h2 className="text-[11px] font-bold tracking-[0.22em] text-gold-ink uppercase">{g.title}</h2>
                  <ul className="mt-4 space-y-2">
                    {g.links.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="text-[14.5px] text-slateluxe transition-colors hover:text-royal"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
