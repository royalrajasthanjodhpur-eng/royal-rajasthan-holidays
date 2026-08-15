"use client";

import { useState } from "react";
import { CtaBand, DestinationCard, PageHero } from "../components/blocks";
import { Container, Section, SectionHeading } from "../components/ui";
import {
  destinations,
  domesticDestinations,
  internationalSorted,
  primeDestinations,
} from "../lib/destinations";
import { IMG } from "../lib/media";
import { cn } from "../utils/cn";

export default function Destinations({ scope = "all" }: { scope?: "all" | "international" | "domestic" }) {
  const [query, setQuery] = useState("");

  const meta = {
    all: {
      title: "All Destinations — International & India",
      description:
        "Explore 36 curated destinations: Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka and 16 Indian destinations. Enquire for a customised itinerary.",
      path: "/destinations",
      hero: IMG.dubai1,
      kicker: "Destinations",
      heading: "Thirty-six destinations. One standard of care.",
      intro:
        "International first, India second — every destination page includes attractions, ideal travellers, best season, hotels, gallery and a direct enquiry line.",
    },
    international: {
      title: "International Destinations",
      description:
        "Luxury international holidays to Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka, Maldives, Turkey, Egypt, Kenya and more.",
      path: "/destinations/international",
      hero: IMG.mld1,
      kicker: "International",
      heading: "Twenty countries, curated by hand",
      intro:
        "Our Prime Group Destinations lead the way, followed by eleven more countries we know intimately.",
    },
    domestic: {
      title: "India Destinations",
      description:
        "Luxury journeys across India — Rajasthan, Kashmir, Ladakh, Kerala, Goa, Andaman, Himachal, Uttarakhand, Sikkim, North East, Gujarat, Madhya Pradesh and more.",
      path: "/destinations/domestic",
      hero: IMG.raj3,
      kicker: "Incredible India",
      heading: "Sixteen ways to fall in love with India",
      intro: "Palaces, backwaters, high passes and tiger country — planned by people who live here.",
    },
  }[scope];

  
  const pool =
    scope === "international" ? internationalSorted : scope === "domestic" ? domesticDestinations : destinations;

  const filtered = query
    ? pool.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()),
      )
    : pool;

  const showGrouped = scope === "all" && !query;

  return (
    <>
      <PageHero
        kicker={meta.kicker}
        title={meta.heading}
        intro={meta.intro}
        image={meta.hero}
        crumbs={[{ label: "Destinations" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="mx-auto mb-14 max-w-xl">
            <label htmlFor="dest-search" className="sr-only">
              Search destinations
            </label>
            <input
              id="dest-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a destination or country…"
              className="w-full rounded-full border border-royal/15 bg-white px-6 py-4 text-[15px] shadow-[0_16px_40px_-30px_rgba(30,78,140,0.6)] focus:border-royal focus:outline-none"
            />
          </div>

          {showGrouped ? (
            <div className="space-y-24">
              <Group
                kicker="⭐ Prime Group Destinations"
                title="Most Popular Group Tours"
                intro="Given equal emphasis and equal expertise — these nine lead every itinerary we design."
                items={primeDestinations}
                large
              />
              <Group
                kicker="International"
                title="More of the world"
                intro="Eleven further countries with trusted ground partners and hand-picked hotels."
                items={internationalSorted.filter((d) => !d.prime)}
              />
              <Group
                kicker="India"
                title="Closer to home"
                intro="Sixteen Indian destinations, from Himalayan passes to southern backwaters."
                items={domesticDestinations}
              />
            </div>
          ) : (
            <>
              <p className="mb-8 text-center text-sm text-slateluxe">
                {filtered.length} destination{filtered.length === 1 ? "" : "s"}
                {query && ` matching “${query}”`}
              </p>
              <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
                {filtered.map((d, i) => (
                  <DestinationCard key={d.slug} d={d} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-12 text-center text-slateluxe">
                  No destination matched your search. Try another name — or simply enquire and we will
                  advise.
                </p>
              )}
            </>
          )}
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

function Group({
  kicker,
  title,
  intro,
  items,
  large,
}: {
  kicker: string;
  title: string;
  intro: string;
  items: typeof destinations;
  large?: boolean;
}) {
  return (
    <div>
      <SectionHeading kicker={kicker} title={title} intro={intro} />
      <div
        className={cn(
          "mt-12 grid gap-6",
          large ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {items.map((d, i) => (
          <DestinationCard key={d.slug} d={d} large={large} index={i} />
        ))}
      </div>
    </div>
  );
}
