import { ArrowLeft, Quote, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CtaBand, EnquirySection, PageHero } from "../components/blocks";
import {
  Accordion,
  Button,
  Container,
  GoldRule,
  Img,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { blogPosts, faqCategories, galleryItems, verifiedReviews } from "../lib/content";
import { IMG } from "../lib/media";
import { useSeo } from "../lib/useSeo";
import { cn } from "../utils/cn";

/* ───────────── GALLERY ───────────── */

export function Gallery() {
  useSeo({
    title: "Gallery — Destinations, Journeys & Moments",
    description:
      "A visual journey through the destinations we curate — international beaches, Himalayan passes, palaces and the moments in between.",
    path: "/gallery",
    image: IMG.bali2,
  });

  const groups = ["All", "International", "India", "Experiences"];
  const [group, setGroup] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () => (group === "All" ? galleryItems : galleryItems.filter((g) => g.group === group)),
    [group],
  );

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="Places we love, photographed"
        intro="Destination galleries, journey moments and the details that make a holiday memorable."
        image={IMG.bali2}
        crumbs={[{ label: "Gallery" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                aria-pressed={group === g}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all",
                  group === g
                    ? "bg-royal text-white shadow-[0_12px_28px_-14px_rgba(30,78,140,0.9)]"
                    : "border border-royal/15 bg-white text-slateluxe hover:border-royal/40 hover:text-royal",
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {items.map((g, i) => (
              <Reveal key={g.src + i} delay={i % 4} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative block w-full overflow-hidden rounded-[20px]"
                  aria-label={`Open ${g.caption}`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-4 text-left text-[12.5px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {g.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-center text-[13px] text-slateluxe">
            Office photographs, event images and guest videos will be added here as they are uploaded.
          </p>
        </Container>
      </Section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/93 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={items[active].caption}
          onClick={() => setActive(null)}
        >
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].src}
              alt={items[active].caption}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">{items[active].caption}</figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Close
          </button>
        </div>
      )}

      <CtaBand />
    </>
  );
}

/* ───────────── BLOG ───────────── */

export function Blog() {
  useSeo({
    title: "The Journal — Travel Guides, Visa Tips & Inspiration",
    description:
      "Destination guides, visa tips, itinerary ideas and practical travel advice from the travel designers at Royal Rajasthan Holidays.",
    path: "/blog",
    image: IMG.vn6,
  });

  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const posts = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        kicker="The Journal"
        title="Travel guides, written by people who go there"
        intro="Practical, honest advice on destinations, seasons, visas and how to travel comfortably."
        image={IMG.vn6}
        crumbs={[{ label: "Blog" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all",
                  cat === c
                    ? "bg-royal text-white"
                    : "border border-royal/15 bg-white text-slateluxe hover:border-royal/40 hover:text-royal",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i % 3} className="h-full">
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-royal/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_74px_-40px_rgba(30,78,140,0.6)]"
                >
                  <Img src={p.image} alt={p.title} ratio="aspect-[16/10]" imgClassName="group-hover:scale-105" />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-gold-ink uppercase">
                      {p.category}
                    </p>
                    <h2 className="mt-3 font-display text-xl leading-snug text-charcoal group-hover:text-royal">
                      {p.title}
                    </h2>
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

      <CtaBand />
    </>
  );
}

export function BlogPost() {
  const { slug = "" } = useParams();
  const p = blogPosts.find((x) => x.slug === slug);

  useSeo({
    title: p?.title ?? "Article",
    description: p?.excerpt ?? "",
    path: `/blog/${slug}`,
    image: p?.image,
    jsonLd: p
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          image: p.image,
          datePublished: p.date,
          author: { "@type": "Organization", name: "Royal Rajasthan Holidays" },
        }
      : undefined,
  });

  if (!p) return <Navigate to="/404" replace />;

  const more = blogPosts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker={p.category}
        title={p.title}
        intro={`${p.date} · ${p.readTime}`}
        image={p.image}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: p.category }]}
      />

      <Section tone="ivory">
        <Container>
          <article className="mx-auto max-w-2xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-semibold text-royal">
              <ArrowLeft aria-hidden className="h-4 w-4" /> Back to the Journal
            </Link>
            <GoldRule className="mt-6 w-24" />
            <div className="mt-8 space-y-6">
              {p.body.map((para, i) => (
                <p
                  key={i}
                  className={cn(
                    "leading-[1.8] text-slateluxe",
                    i === 0 ? "text-[18px] text-charcoal" : "text-[16.5px]",
                  )}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 rounded-[24px] border border-gold/25 bg-gradient-to-br from-gold/12 to-transparent p-8">
              <h2 className="font-display text-2xl text-charcoal">Planning this journey?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slateluxe">
                Every itinerary we design is built from scratch around your dates, your travellers and your
                pace. Tell us what you have in mind.
              </p>
              <Button to="/contact" className="mt-6">
                Get Customised Itinerary
              </Button>
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="beige">
        <Container>
          <SectionHeading kicker="Keep Reading" title="More from the Journal" />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i} className="h-full">
                <Link
                  to={`/blog/${m.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-royal/8 transition-all hover:-translate-y-1.5"
                >
                  <Img src={m.image} alt={m.title} ratio="aspect-[16/10]" imgClassName="group-hover:scale-105" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-gold-ink uppercase">
                      {m.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg leading-snug text-charcoal group-hover:text-royal">
                      {m.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

/* ───────────── GUEST STORIES ───────────── */

export function GuestStoriesPage() {
  useSeo({
    title: "Guest Stories — Verified Google Reviews",
    description:
      "Real, verified Google Reviews from travellers who have journeyed with Royal Rajasthan Holidays. We never publish fabricated testimonials.",
    path: "/guest-stories",
    image: IMG.ppl2,
  });

  const has = verifiedReviews.length > 0;

  return (
    <>
      <PageHero
        kicker="Guest Stories"
        title="Words we did not write"
        intro="Everything published here comes from verified Google Reviews left by our travellers. Nothing is invented, edited or embellished."
        image={IMG.ppl2}
        crumbs={[{ label: "Guest Stories" }]}
      />

      <Section tone="ivory">
        <Container>
          {has ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="mx-auto max-w-2xl rounded-[24px] border border-royal/10 bg-white p-10 text-center shadow-[0_26px_70px_-45px_rgba(30,78,140,0.5)]">
              <p className="font-display text-5xl text-gold">★★★★★</p>
              <h2 className="mt-6 font-display text-2xl text-charcoal">
                Our reviews live on Google — exactly where you can verify them
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-slateluxe">
                We have a firm policy against writing our own testimonials. Verified Google Reviews from our
                travellers will be published on this page as they are imported. In the meantime, please read
                them at source.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  href="https://www.google.com/search?q=Royal+Rajasthan+Holidays+Jodhpur+reviews"
                  external
                  variant="primary"
                >
                  Read Google Reviews
                </Button>
                <Button to="/contact" variant="outline">
                  Talk to a Travel Expert
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

/* ───────────── FAQ ───────────── */

export function Faq() {
  useSeo({
    title: "Frequently Asked Questions",
    description:
      "Answers on booking, visas, hotels, flights, payments, cancellations and travelling with Royal Rajasthan Holidays.",
    path: "/faq",
    image: IMG.sg5,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqCategories.flatMap((c) =>
        c.items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      ),
    },
  });

  const [active, setActive] = useState(faqCategories[0].name);
  const current = faqCategories.find((c) => c.name === active) ?? faqCategories[0];

  return (
    <>
      <PageHero
        kicker="Help Centre"
        title="Frequently asked questions"
        intro="Booking, visas, hotels, flights, payments, cancellations and travel tips — answered plainly."
        image={IMG.sg5}
        crumbs={[{ label: "FAQ" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
              <ul className="flex flex-wrap gap-2 lg:flex-col">
                {faqCategories.map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => setActive(c.name)}
                      aria-current={active === c.name}
                      className={cn(
                        "w-full rounded-full px-5 py-3 text-left text-[13.5px] font-semibold transition-all lg:rounded-2xl",
                        active === c.name
                          ? "bg-royal text-white"
                          : "border border-royal/12 bg-white text-slateluxe hover:border-royal/40 hover:text-royal",
                      )}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="mb-6 font-display text-2xl text-charcoal">{current.name}</h2>
              <Accordion items={current.items} />
            </div>
          </div>
        </Container>
      </Section>

      <EnquirySection title="Still have a question?" />
      <CtaBand />
    </>
  );
}
