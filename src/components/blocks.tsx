import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { waLink } from "../lib/content";
import type { Destination } from "../lib/destinations";
import { cn } from "../utils/cn";
import { EnquiryForm } from "./EnquiryForm";
import { Button, Container, GoldRule, Img, Kicker, Reveal, Ribbon, Section, SectionHeading } from "./ui";

/* ───────── Page hero (inner pages) ───────── */

export function PageHero({
  kicker,
  title,
  intro,
  image,
  crumbs,
  tall = false,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: string;
  image: string;
  crumbs?: { label: string; to?: string }[];
  tall?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden",
        tall ? "min-h-[78vh] pt-40 pb-16 md:min-h-[86vh] md:pb-24" : "min-h-[58vh] pt-36 pb-14 md:min-h-[66vh] md:pb-20",
      )}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/92 via-charcoal/55 to-charcoal/45"
      />
      <Container>
        <div className="max-w-3xl">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] text-white/65">
                <li>
                  <Link to="/" className="hover:text-gold-soft">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    {c.to ? (
                      <Link to={c.to} className="hover:text-gold-soft">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white/90">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {kicker && <Kicker light>{kicker}</Kicker>}
          <h1 className="mt-4 text-4xl leading-[1.08] font-medium text-white text-balance sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Destination card ───────── */

export function DestinationCard({
  d,
  large = false,
  index = 0,
}: {
  d: Destination;
  large?: boolean;
  index?: number;
}) {
  return (
    <Reveal delay={index % 4} className="h-full">
      <Link
        to={`/destination/${d.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_18px_50px_-32px_rgba(30,78,140,0.5)] ring-1 ring-royal/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-36px_rgba(30,78,140,0.6)]"
      >
        <div className="relative overflow-hidden">
          <Img
            src={d.hero}
            alt={`${d.name} — ${d.tagline}`}
            ratio={large ? "aspect-[4/3]" : "aspect-[5/4]"}
            imgClassName="group-hover:scale-[1.07]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-80"
          />
          {d.ribbon && (
            <div className="absolute top-4 left-4">
              <Ribbon>{d.ribbon}</Ribbon>
            </div>
          )}
          <p className="absolute bottom-4 left-5 text-[11px] font-semibold tracking-[0.2em] text-white/85 uppercase">
            {d.country}
          </p>
        </div>

        <div className={cn("flex flex-1 flex-col p-6", large && "sm:p-7")}>
          <h3
            className={cn(
              "font-display font-medium text-charcoal transition-colors group-hover:text-royal",
              large ? "text-2xl sm:text-[26px]" : "text-xl",
            )}
          >
            {d.name}
          </h3>
          <GoldRule className="mt-3 w-14" />
          <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slateluxe">{d.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {d.idealFor.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-royal-50 px-2.5 py-1 text-[11px] font-medium text-royal"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-royal">
            Explore {d.name}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ───────── CTA band ───────── */

export function CtaBand({
  title = "Every journey begins with a conversation.",
  intro = "Tell us who is travelling and when. Your dedicated travel designer will craft an itinerary around you — no fixed packages, no published prices.",
  destination,
}: {
  title?: string;
  intro?: string;
  destination?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-royal py-20 text-white md:py-24">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-ocean/40 blur-3xl"
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Kicker light>Enquire First</Kicker>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white text-balance sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/contact" variant="gold" size="lg" magnetic>
              Plan Your Journey
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Get Customised Itinerary
            </Button>
            <Button
              href={waLink(
                destination
                  ? `Hello, I'd like a customised itinerary for ${destination}.`
                  : "Hello Royal Rajasthan Holidays, I would like to plan a journey.",
              )}
              external
              variant="ghost"
              size="lg"
            >
              <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────── Enquiry section ───────── */

export function EnquirySection({
  destination,
  image,
  title,
}: {
  destination?: string;
  image?: string;
  title?: string;
}) {
  return (
    <Section tone="beige" id="enquire" label="Enquiry">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              kicker="Talk to a Travel Expert"
              title={title ?? "Let's design something unforgettable."}
              intro="Share your dates and travel style. We reply with a thoughtful, itemised proposal — usually within one working day."
            />
            <Reveal delay={3}>
              <ul className="mt-8 space-y-4">
                {[
                  "A dedicated travel designer, from enquiry to homecoming",
                  "Bespoke itineraries — never a fixed, off-the-shelf package",
                  "Transparent inclusions, exclusions and cancellation terms",
                  "24×7 WhatsApp support for the duration of your journey",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-slateluxe">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            {image && (
              <Reveal delay={4}>
                <Img
                  src={image}
                  alt=""
                  ratio="aspect-[16/9]"
                  className="mt-9 hidden rounded-[24px] lg:block"
                />
              </Reveal>
            )}
          </div>
          <Reveal delay={2}>
            <EnquiryForm defaultDestination={destination} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
