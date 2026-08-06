import { Check } from "lucide-react";
import { Navigate } from "react-router-dom";
import { CtaBand, EnquirySection, PageHero } from "../components/blocks";
import { Accordion, Container, GoldRule, Kicker, Reveal, Section, SectionHeading } from "../components/ui";
import { services } from "../lib/content";
import { useSeo } from "../lib/useSeo";

export default function ServicePage({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug);

  useSeo({
    title: s ? `${s.title} — ${s.kicker}` : "Services",
    description: s?.intro.slice(0, 158) ?? "Travel services by Royal Rajasthan Holidays.",
    path: `/${slug}`,
    image: s?.hero,
  });

  if (!s) return <Navigate to="/404" replace />;

  return (
    <>
      <PageHero
        kicker={s.kicker}
        title={s.title}
        intro={s.intro}
        image={s.hero}
        crumbs={[{ label: s.title }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="space-y-16">
            {s.sections.map((sec, i) => (
              <Reveal key={sec.title} delay={i}>
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                  <div>
                    <Kicker>{`0${i + 1}`}</Kicker>
                    <h2 className="mt-4 font-display text-2xl leading-tight text-charcoal sm:text-3xl">
                      {sec.title}
                    </h2>
                    <GoldRule className="mt-5 w-20" />
                    <p className="mt-5 text-[15.5px] leading-relaxed text-slateluxe">{sec.body}</p>
                  </div>
                  <ul className="grid gap-3 rounded-[24px] bg-white p-7 ring-1 ring-royal/8 sm:grid-cols-2 sm:p-8">
                    {sec.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[14.5px] text-slateluxe">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emeraldluxe" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="beige">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading align="left" kicker="FAQ" title={`${s.title} — common questions`} />
            <Reveal delay={2}>
              <Accordion items={s.faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <EnquirySection title={`Enquire about ${s.title.toLowerCase()}`} />
      <CtaBand />
    </>
  );
}
