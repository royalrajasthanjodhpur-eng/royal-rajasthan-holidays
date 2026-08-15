"use client";

import { BadgeCheck, Building2, Compass, Globe2, Quote } from "lucide-react";
import { CtaBand, PageHero } from "../components/blocks";
import {
  Container,
  GoldRule,
  Img,
  Kicker,
  ParallaxImage,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { BRAND, stats, timeline, values } from "../lib/content";
import { IMG } from "../lib/media";

const team = [
  { name: "Prakash Arora", role: "Founder & Managing Director", img: IMG.raj2 },
  { name: "Head of International Travel", role: "Prime Group Destinations", img: IMG.dubai5 },
  { name: "Documentation Desk Lead", role: "Visa & travel documentation", img: IMG.sg2 },
  { name: "Corporate & MICE Director", role: "Offsites, incentives, conferences", img: IMG.res4 },
];

const credentials = [
  { icon: Globe2, title: "IATA-aligned practices", body: "Ticketing and fare handling to international standards." },
  { icon: BadgeCheck, title: "GST-registered", body: "Every booking receipted with a compliant tax invoice." },
  {
    icon: Building2,
    title: "Registered travel company",
    body: "Operating from our own office on D Road, Sardarpura, Jodhpur since 2005.",
  },
  { icon: Compass, title: "Destination specialists", body: "Ground partners personally vetted in all 36 destinations." },
];

export default function About() {
  
  return (
    <>
      <PageHero
        kicker="Our Story"
        title="Twenty years of designing journeys from Jodhpur to the world"
        intro="Royal Rajasthan Holidays began in Sardarpura, Jodhpur with a single desk, a telephone and a conviction that travel should be crafted, not sold."
        image={IMG.raj6}
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <Section tone="ivory">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Kicker>The Company</Kicker>
              <h2 className="mt-5 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Built on relationships, not transactions
              </h2>
              <GoldRule className="mt-6 w-24" />
              <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-slateluxe">
                <p>
                  We started in {BRAND.established} on D Road in Sardarpura, Jodhpur, arranging heritage
                  journeys through Rajasthan for guests who wanted something more considered than a coach
                  tour. Word travelled. Families returned. Their children now travel with us.
                </p>
                <p>
                  Two decades later we design journeys across twenty countries and sixteen Indian regions —
                  but the method has not changed. Someone listens carefully, writes an itinerary by hand,
                  and then takes personal responsibility for it.
                </p>
                <p>
                  We deliberately do not publish package prices. A price without context is a promise we
                  cannot keep, and we would rather earn your trust with an honest, itemised proposal built
                  around your actual dates and travellers.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-[20px] bg-white p-6 ring-1 ring-royal/8">
                    <p className="font-display text-3xl text-royal">{s.value}</p>
                    <p className="mt-1 text-[12px] tracking-wide text-slateluxe uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Reveal delay={1}>
              <div className="grid gap-5 sm:grid-cols-2">
                <ParallaxImage src={IMG.raj1} alt="Rajasthan heritage architecture" className="aspect-[3/4] rounded-[24px]" />
                <div className="space-y-5 sm:pt-12">
                  <Img src={IMG.dubai1} alt="Dubai skyline" ratio="aspect-square" className="rounded-[24px]" />
                  <Img src={IMG.ker2} alt="Kerala backwaters" ratio="aspect-[3/4]" className="rounded-[24px]" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission / Vision */}
      <Section tone="beige">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Our Mission",
                body: "To design travel that feels personal — itineraries shaped around real people, delivered with honesty, precision and warmth.",
              },
              {
                title: "Our Vision",
                body: "To be India's most trusted luxury travel house: the company families return to for a lifetime of journeys.",
              },
              {
                title: "Our Promise",
                body: "No fabricated reviews. No published prices that cannot be honoured. No guarantees we do not control. Only work we can stand behind.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i} className="h-full">
                <div className="flex h-full flex-col rounded-[24px] bg-white p-8 ring-1 ring-royal/8">
                  <span aria-hidden className="h-1 w-12 rounded-full bg-gold" />
                  <h3 className="mt-5 font-display text-2xl text-charcoal">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slateluxe">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <div className="rounded-[20px] border border-royal/10 bg-ivory p-6">
                  <p className="font-display text-xl text-royal">{v.title}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slateluxe">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder message */}
      <section className="relative isolate overflow-hidden bg-royal py-24 text-white md:py-28">
        <div aria-hidden className="absolute -right-20 -bottom-20 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Quote aria-hidden className="mx-auto h-10 w-10 text-gold-soft" />
            <blockquote className="mt-7 font-display text-2xl leading-relaxed text-white italic sm:text-[2rem] sm:leading-[1.35]">
              “A holiday is not a product. It is somebody's twenty-fifth anniversary, somebody's first flight,
              somebody's parents finally seeing the sea. We treat every itinerary that way.”
            </blockquote>
            <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-gold-soft uppercase">
              {BRAND.contactPerson} — Founder, Royal Rajasthan Holidays
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <Section tone="ivory">
        <Container>
          <SectionHeading kicker="Our Journey" title="Two decades, one standard" />
          <ol className="relative mx-auto mt-16 max-w-3xl border-l border-royal/15 pl-8 sm:pl-12">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i} as="li" className="relative block pb-12 last:pb-0">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-ivory sm:-left-[57px]"
                />
                <p className="font-display text-2xl text-gold-ink">{t.year}</p>
                <h3 className="mt-1 font-display text-xl text-charcoal">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slateluxe">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Team */}
      <Section tone="beige">
        <Container>
          <SectionHeading
            kicker="The Team"
            title="The people behind your journey"
            intro="Small by design. You will speak with the same person from your first enquiry to the day you return."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i}>
                <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-royal/8">
                  <Img src={m.img} alt="" ratio="aspect-[4/5]" />
                  <div className="p-6">
                    <h3 className="font-display text-lg text-charcoal">{m.name}</h3>
                    <p className="mt-1 text-[13.5px] text-slateluxe">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-slateluxe">
            Official team photographs and office images will be published here once uploaded.
          </p>
        </Container>
      </Section>

      {/* Credentials */}
      <Section tone="ivory">
        <Container>
          <SectionHeading kicker="Credentials" title="How we operate" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c, i) => (
              <Reveal key={c.title} delay={i}>
                <div className="h-full rounded-[24px] border border-royal/10 bg-white p-7">
                  <c.icon aria-hidden className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-display text-lg text-charcoal">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slateluxe">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Let's plan something worth remembering." />
    </>
  );
}
