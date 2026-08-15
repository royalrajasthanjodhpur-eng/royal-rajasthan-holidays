"use client";

import { CalendarDays, Camera, Hotel, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "../compat/router";
import { CtaBand, DestinationCard, EnquirySection, PageHero } from "../components/blocks";
import {
  Accordion,
  Button,
  Container,
  GoldRule,
  Img,
  Kicker,
  ParallaxImage,
  Pill,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { waLink } from "../lib/content";
import { bySlug, destinations } from "../lib/destinations";

export const scrollToEnquiry = () =>
  document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function DestinationDetail() {
  const { slug = "" } = useParams();
  const d = bySlug(slug);
  const [lightbox, setLightbox] = useState<string | null>(null);

  
  if (!d) return <Navigate to="/404" replace />;

  const related = (d.related ?? [])
    .map((s) => bySlug(s))
    .filter(Boolean)
    .slice(0, 3) as typeof destinations;

  return (
    <>
      <PageHero
        tall
        kicker={d.prime ? "⭐ Prime Group Destination" : d.region === "international" ? "International" : "India"}
        title={d.name}
        intro={d.tagline}
        image={d.hero}
        crumbs={[
          { label: "Destinations", to: "/destinations" },
          {
            label: d.region === "international" ? "International" : "India",
            to: `/destinations/${d.region === "international" ? "international" : "domestic"}`,
          },
          { label: d.name },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={scrollToEnquiry} variant="gold" size="lg" magnetic>
            Plan Your Journey
          </Button>
          <Button onClick={scrollToEnquiry} variant="ghost" size="lg">
            Get Customised Itinerary
          </Button>
          <Button
            href={waLink(`Hello, I'd like a customised ${d.name} itinerary.`)}
            external
            variant="ghost"
            size="lg"
          >
            <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp Us
          </Button>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-royal/8 bg-white py-8">
        <Container>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Fact icon={<MapPin className="h-4 w-4" />} label="Country / Region" value={d.country} />
            <Fact icon={<CalendarDays className="h-4 w-4" />} label="Best Time to Visit" value={d.bestTime} />
            <Fact
              icon={<Users className="h-4 w-4" />}
              label="Ideal For"
              value={d.idealFor.slice(0, 3).join(", ")}
            />
            <Fact
              icon={<Sparkles className="h-4 w-4" />}
              label="Journey Style"
              value={d.prime ? "Group departures & private" : "Private & tailor-made"}
            />
          </dl>
        </Container>
      </section>

      {/* Overview + why visit */}
      <Section tone="ivory">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Kicker>Destination Overview</Kicker>
              <h2 className="mt-5 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Why {d.name} stays with you
              </h2>
              <GoldRule className="mt-6 w-24" />
              <p className="mt-6 text-[16.5px] leading-relaxed text-slateluxe">{d.overview}</p>

              <h3 className="mt-10 font-display text-2xl text-charcoal">Why visit</h3>
              <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                {d.whyVisit.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-[15px] text-slateluxe">
                    <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {w}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-2xl text-charcoal">Ideal for</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.idealFor.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>

            <Reveal delay={1}>
              <div className="space-y-6">
                <ParallaxImage
                  src={d.gallery[0] ?? d.hero}
                  alt={`${d.name} landscape`}
                  className="aspect-[4/5] rounded-[24px]"
                />
                <div className="rounded-[24px] border border-gold/25 bg-gradient-to-br from-gold/12 to-transparent p-7">
                  <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-gold-ink uppercase">
                    <CalendarDays aria-hidden className="h-3.5 w-3.5" /> Best time to visit
                  </p>
                  <p className="mt-3 font-display text-2xl text-charcoal">{d.bestTime}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slateluxe">{d.bestTimeNote}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Attractions */}
      <Section tone="beige">
        <Container>
          <SectionHeading
            kicker="Top Attractions"
            title={`What we will show you in ${d.name}`}
            intro="Handpicked highlights — sequenced sensibly, timed to avoid crowds and paced for your group."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {d.attractions.map((a, i) => (
              <Reveal key={a.name} delay={i % 2} className="h-full">
                <article className="flex h-full gap-5 rounded-[24px] bg-white p-7 ring-1 ring-royal/8 transition-shadow hover:shadow-[0_28px_65px_-42px_rgba(30,78,140,0.6)]">
                  <span className="font-display text-3xl text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl text-charcoal">{a.name}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slateluxe">{a.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[24px] bg-white p-8 ring-1 ring-royal/8">
                <h3 className="flex items-center gap-2 font-display text-2xl text-charcoal">
                  <Sparkles aria-hidden className="h-5 w-5 text-gold" /> Suggested experiences
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.experiences.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-[15px] text-slateluxe">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-[24px] bg-white p-8 ring-1 ring-royal/8">
                <h3 className="flex items-center gap-2 font-display text-2xl text-charcoal">
                  <Hotel aria-hidden className="h-5 w-5 text-gold" /> Where you will stay
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.hotels.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[15px] text-slateluxe">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                      {h}
                    </li>
                  ))}
                </ul>
                {d.region === "international" && d.visa && (
                  <div className="mt-7 rounded-2xl bg-royal-50 p-5">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-royal uppercase">
                      Visa information
                    </p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slateluxe">{d.visa}</p>
                    <p className="mt-2 text-[13px] text-slateluxe">
                      Requirements change frequently and approval rests with the issuing authority. Our
                      documentation desk confirms the current rule for your passport before you book.
                    </p>
                    <Button to="/visa" variant="outline" size="sm" className="mt-4">
                      Visa Services
                    </Button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section tone="ivory">
        <Container>
          <SectionHeading kicker="Gallery" title={`${d.name} in pictures`} />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[d.hero, ...d.gallery].slice(0, 8).map((src, i) => (
              <Reveal key={src + i} delay={i % 4}>
                <button
                  type="button"
                  onClick={() => setLightbox(src)}
                  aria-label={`View larger image ${i + 1} of ${d.name}`}
                  className="group relative block w-full overflow-hidden rounded-[20px]"
                >
                  <Img src={src} alt={`${d.name} ${i + 1}`} ratio="aspect-square" imgClassName="group-hover:scale-110" />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-charcoal/35 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/92 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt={`${d.name} enlarged`} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Close
          </button>
        </div>
      )}

      {/* FAQ */}
      <Section tone="beige">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              align="left"
              kicker="FAQ"
              title={`${d.name} — your questions answered`}
              intro="Cannot find what you need? Message us on WhatsApp and a travel expert will reply personally."
            />
            <Reveal delay={2}>
              <Accordion items={d.faqs ?? []} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <EnquirySection destination={d.name} title={`Plan your ${d.name} journey`} />

      {related.length > 0 && (
        <Section tone="ivory">
          <Container>
            <SectionHeading kicker="Related Destinations" title="You may also love" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <DestinationCard key={r.slug} d={r} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`Ready to see ${d.name}?`}
        intro="Send us your dates and we will design an itinerary shaped entirely around you."
        destination={d.name}
      />
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span aria-hidden className="mt-0.5 text-gold">
        {icon}
      </span>
      <div>
        <dt className="text-[10.5px] font-bold tracking-[0.18em] text-slateluxe uppercase">{label}</dt>
        <dd className="mt-1 text-[15px] font-medium text-charcoal">{value}</dd>
      </div>
    </div>
  );
}
