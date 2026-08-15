"use client";

import { Link, Navigate, useParams } from "../compat/router";
import { CtaBand, DestinationCard, EnquirySection, PageHero } from "../components/blocks";
import {
  Container,
  GoldRule,
  Img,
  Kicker,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { holidayTypes } from "../lib/content";
import { destinations } from "../lib/destinations";
import { IMG } from "../lib/media";

export function HolidayTypesIndex() {
  
  return (
    <>
      <PageHero
        kicker="Holiday Types"
        title="However you travel, we have designed it before"
        intro="Eleven ways to travel — each with its own pacing, hotels, guiding style and small considerations."
        image={IMG.bali1}
        crumbs={[{ label: "Holiday Types" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {holidayTypes.map((h, i) => (
              <Reveal key={h.slug} delay={i % 3} className="h-full">
                <Link
                  to={`/holidays/${h.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-royal/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_74px_-40px_rgba(30,78,140,0.6)]"
                >
                  <Img src={h.image} alt={h.name} ratio="aspect-[16/10]" imgClassName="group-hover:scale-105" />
                  <div className="flex flex-1 flex-col p-7">
                    <span aria-hidden className="text-2xl">
                      {h.icon}
                    </span>
                    <h2 className="mt-3 font-display text-xl text-charcoal group-hover:text-royal">{h.name}</h2>
                    <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slateluxe">{h.blurb}</p>
                    <span className="mt-5 text-[13px] font-semibold text-royal">Explore →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <EnquirySection image={IMG.res5} />
      <CtaBand />
    </>
  );
}

export function HolidayTypeDetail() {
  const { slug = "" } = useParams();
  const h = holidayTypes.find((x) => x.slug === slug);

  
  if (!h) return <Navigate to="/404" replace />;

  const suggested = destinations
    .filter((d) => h.suited.includes(d.name))
    .slice(0, 4);

  return (
    <>
      <PageHero
        kicker="Holiday Type"
        title={h.name}
        intro={h.blurb}
        image={h.image}
        crumbs={[{ label: "Holiday Types", to: "/holidays" }, { label: h.name }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Kicker>Our Approach</Kicker>
              <h2 className="mt-5 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Designed for how you actually travel
              </h2>
              <GoldRule className="mt-6 w-24" />
              <p className="mt-6 text-[16.5px] leading-relaxed text-slateluxe">{h.intro}</p>

              <h3 className="mt-10 font-display text-2xl text-charcoal">What we take care of</h3>
              <ul className="mt-5 space-y-3.5">
                {h.highlights.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[15px] text-slateluxe">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={1}>
              <Img src={h.image} alt={h.name} ratio="aspect-[4/5]" className="rounded-[24px]" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {suggested.length > 0 && (
        <Section tone="beige">
          <Container>
            <SectionHeading
              kicker="Recommended Destinations"
              title={`Where ${h.name.toLowerCase()} work beautifully`}
              intro="A starting point, not a limitation — we will design this holiday type anywhere we operate."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {suggested.map((d, i) => (
                <DestinationCard key={d.slug} d={d} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <EnquirySection title={`Plan your ${h.name.toLowerCase()}`} />
      <CtaBand />
    </>
  );
}
