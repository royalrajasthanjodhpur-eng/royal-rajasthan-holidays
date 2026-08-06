import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Clock,
  Heart,
  PenLine,
  Play,
  Quote,
  Shield,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBand, DestinationCard, EnquirySection } from "../components/blocks";
import {
  Button,
  Container,
  GoldRule,
  Img,
  Kicker,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import {
  BRAND,
  blogPosts,
  faqCategories,
  galleryItems,
  holidayTypes,
  stats,
  verifiedReviews,
  whyChooseUs,
} from "../lib/content";
import { domesticDestinations, internationalSorted, primeDestinations } from "../lib/destinations";
import { HERO_POSTER, HERO_VIDEO, IMG } from "../lib/media";
import { useSeo } from "../lib/useSeo";
import { Accordion } from "../components/ui";

const iconMap = { award: Award, pen: PenLine, user: User, clock: Clock, shield: Shield, heart: Heart };

export default function Home() {
  useSeo({
    title: "Luxury Holidays to the World's Most Beautiful Destinations",
    description:
      "Royal Rajasthan Holidays designs bespoke luxury journeys to Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka and across India. Enquire for a customised itinerary.",
    path: "/",
    image: HERO_POSTER,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: BRAND.legalName,
      slogan: BRAND.tagline,
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

  return (
    <>
      <Hero />
      <TrustStrip />
      <PrimeSection />
      <InternationalSection />
      <DomesticSection />
      <HolidayTypesSection />
      <WhySection />
      <GuestStories />
      <GalleryPreview />
      <BlogPreview />
      <FaqPreview />
      <EnquirySection image={IMG.res3} />
      <CtaBand />
    </>
  );
}

/* ───────────── HERO ───────────── */

function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const names = primeDestinations.map((d) => d.name);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % names.length), 2800);
    return () => clearInterval(t);
  }, [names.length]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {reduce ? (
        <img src={HERO_POSTER} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover" />
      ) : (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/72 via-charcoal/45 to-charcoal/85"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ivory to-transparent"
      />

      <Container className="relative pt-36 pb-28 md:pt-40 md:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Kicker light>Since {BRAND.established} · Jodhpur, Rajasthan, India</Kicker>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.6rem] leading-[1.05] font-medium text-white text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            We Take You to the World's{" "}
            <span className="italic text-gold-soft">Most Beautiful</span> Destinations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/82 sm:text-lg"
          >
            Bespoke luxury journeys for families, couples, honeymooners, senior citizens, friends and
            corporate groups — designed by hand, never sold from a shelf.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button to="/contact" variant="gold" size="lg" magnetic>
              Plan Your Journey
            </Button>
            <Button to="/destinations" variant="ghost" size="lg">
              <Play aria-hidden className="h-4 w-4" /> Explore Destinations
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex items-center gap-4 text-white/75"
          >
            <span className="text-[11px] font-semibold tracking-[0.24em] uppercase">Now trending</span>
            <span aria-hidden className="h-px w-8 bg-white/30" />
            <span
              key={i}
              className="animate-[fadeIn_.6s_ease] font-display text-xl text-gold-soft italic sm:text-2xl"
            >
              {names[i]}
            </span>
          </motion.div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span aria-hidden className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
        </span>
      </div>
    </section>
  );
}

/* ───────────── TRUST ───────────── */

function TrustStrip() {
  return (
    <section className="border-b border-royal/8 bg-ivory py-10">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i} className="text-center">
              <p className="font-display text-3xl text-royal sm:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-[12px] font-medium tracking-[0.16em] text-slateluxe uppercase">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────── PRIME ───────────── */

function PrimeSection() {
  return (
    <Section tone="ivory" id="prime" label="Prime group destinations">
      <Container>
        <SectionHeading
          kicker="⭐ Prime Group Destinations"
          title="The nine journeys our guests ask for most"
          intro="Escorted group departures and private itineraries to the destinations we know better than anyone — each given equal care, equal detail and equal emphasis."
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {primeDestinations.map((d, i) => (
            <DestinationCard key={d.slug} d={d} large index={i} />
          ))}
        </div>
        <Reveal delay={2} className="mt-12 flex justify-center">
          <Button to="/destinations" variant="outline" size="lg">
            View All 36 Destinations
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ───────────── INTERNATIONAL ───────────── */

function InternationalSection() {
  const rest = internationalSorted.filter((d) => !d.prime);
  return (
    <Section tone="beige" label="International destinations">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            kicker="International First"
            title="Further afield, beautifully arranged"
            intro="Eleven more countries where our ground partners, guides and hotel relationships make the difference."
            className="max-w-2xl"
          />
          <Reveal delay={2}>
            <Button to="/destinations/international" variant="outline">
              All International
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((d, i) => (
            <DestinationCard key={d.slug} d={d} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── DOMESTIC ───────────── */

function DomesticSection() {
  return (
    <Section tone="ivory" label="India destinations">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            kicker="Incredible India"
            title="And closer to home, our own extraordinary country"
            intro="From the palaces of Rajasthan to the backwaters of Kerala and the high passes of Ladakh — planned with the confidence of two decades on the ground."
            className="max-w-2xl"
          />
          <Reveal delay={2}>
            <Button to="/destinations/domestic" variant="outline">
              All India Destinations
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domesticDestinations.map((d, i) => (
            <DestinationCard key={d.slug} d={d} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── HOLIDAY TYPES ───────────── */

function HolidayTypesSection() {
  return (
    <Section tone="beige" label="Holiday types">
      <Container>
        <SectionHeading
          kicker="Travel Your Way"
          title="Holiday types, shaped around the people travelling"
          intro="The destination is only half the story. How you travel — and with whom — decides everything else."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {holidayTypes.map((h, i) => (
            <Reveal key={h.slug} delay={i % 3} className="h-full">
              <Link
                to={`/holidays/${h.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white p-7 ring-1 ring-royal/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-40px_rgba(30,78,140,0.6)]"
              >
                <span
                  aria-hidden
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-xl transition-colors group-hover:bg-gold/20"
                >
                  {h.icon}
                </span>
                <h3 className="mt-5 font-display text-xl text-charcoal group-hover:text-royal">{h.name}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slateluxe">{h.blurb}</p>
                <span className="mt-5 text-[13px] font-semibold text-royal">Discover →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── WHY ───────────── */

function WhySection() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-24 text-white md:py-32">
      <img
        src={IMG.raj6}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/80" />
      <Container>
        <SectionHeading
          light
          kicker="Why Royal Rajasthan Holidays"
          title="Twenty years of getting the details right"
          intro="We are not a booking engine. We are a small team of travel designers who answer the phone, remember your family, and take responsibility for every element of your journey."
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w, i) => {
            const Icon = iconMap[w.icon as keyof typeof iconMap];
            return (
              <Reveal key={w.title} delay={i % 3}>
                <div className="flex gap-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/40 bg-gold/12 text-gold-soft">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-white">{w.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────────── GUEST STORIES ───────────── */

export function GuestStories() {
  const hasReviews = verifiedReviews.length > 0;
  return (
    <Section tone="ivory" label="Guest stories">
      <Container>
        <SectionHeading
          kicker="Guest Stories"
          title="In our guests' own words"
          intro="We publish only verified Google Reviews written by travellers who have actually journeyed with us. Nothing here is written by us."
        />

        {hasReviews ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {verifiedReviews.map((r, i) => (
              <Reveal key={`${r.author}-${i}`} delay={i % 3} className="h-full">
                <figure className="flex h-full flex-col rounded-[24px] bg-white p-7 ring-1 ring-royal/8">
                  <Quote aria-hidden className="h-7 w-7 text-gold" />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slateluxe">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-royal/8 pt-4">
                    <p className="font-semibold text-charcoal">{r.author}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slateluxe">
                      <span className="flex" aria-label={`${r.rating} out of 5 stars`}>
                        {Array.from({ length: r.rating }).map((_, s) => (
                          <Star key={s} aria-hidden className="h-3.5 w-3.5 fill-gold text-gold" />
                        ))}
                      </span>
                      · Google Review · {r.date}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={2}>
            <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[24px] border border-royal/10 bg-white shadow-[0_26px_70px_-45px_rgba(30,78,140,0.55)]">
              <div className="grid md:grid-cols-5">
                <div className="flex flex-col justify-center bg-royal p-8 text-center text-white md:col-span-2">
                  <p className="font-display text-5xl text-gold-soft">★★★★★</p>
                  <p className="mt-3 text-sm text-white/80">Rated by our travellers on Google</p>
                </div>
                <div className="p-8 md:col-span-3">
                  <h3 className="font-display text-2xl text-charcoal">
                    Real reviews only — never fabricated
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slateluxe">
                    Our guest stories are published directly from verified Google Reviews. Rather than
                    invent testimonials, we invite you to read what our travellers have written
                    themselves.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      href="https://www.google.com/search?q=Royal+Rajasthan+Holidays+Jodhpur+reviews"
                      external
                      variant="outline"
                      size="sm"
                    >
                      Read our Google Reviews
                    </Button>
                    <Button to="/guest-stories" variant="ghost" size="sm" className="!text-royal !border-royal/25">
                      Guest Stories
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

/* ───────────── GALLERY ───────────── */

function GalleryPreview() {
  const items = galleryItems.slice(0, 8);
  return (
    <Section tone="beige" label="Gallery">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            kicker="Gallery"
            title="Moments from our journeys"
            className="max-w-2xl"
          />
          <Reveal delay={2}>
            <Button to="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={g.src} delay={i % 4}>
              <figure className="group relative overflow-hidden rounded-[20px]">
                <Img src={g.src} alt={g.caption} ratio="aspect-square" imgClassName="group-hover:scale-110" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-4 text-[12.5px] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── BLOG ───────────── */

function BlogPreview() {
  return (
    <Section tone="ivory" label="Journal">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            kicker="The Journal"
            title="Travel guides & inspiration"
            className="max-w-2xl"
          />
          <Reveal delay={2}>
            <Button to="/blog" variant="outline">
              Read the Journal
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i} className="h-full">
              <Link
                to={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-royal/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-40px_rgba(30,78,140,0.55)]"
              >
                <Img src={p.image} alt={p.title} ratio="aspect-[16/10]" imgClassName="group-hover:scale-105" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-gold-ink uppercase">
                    {p.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-snug text-charcoal group-hover:text-royal">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slateluxe">{p.excerpt}</p>
                  <p className="mt-5 text-xs text-slateluxe">
                    {p.date} · {p.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── FAQ ───────────── */

function FaqPreview() {
  const items = [faqCategories[0].items[0], faqCategories[0].items[1], faqCategories[1].items[0], faqCategories[3].items[0]];
  return (
    <Section tone="beige" label="Frequently asked questions">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              kicker="FAQ"
              title="Questions we are asked most"
              intro="Everything about booking, visas, hotels, payments and travelling with us."
            />
            <GoldRule className="mt-8 w-28" />
            <Reveal delay={3}>
              <Button to="/faq" variant="outline" className="mt-8">
                See All Questions
              </Button>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
