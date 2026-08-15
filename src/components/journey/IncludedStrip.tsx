"use client";

/**
 * Compact "What's Included" strip.
 *
 * Five icons only — Flight, Hotel, Transport, Meals, Sightseeing. Per the
 * brief this replaces the need for separate Transport/Meals/Sightseeing pages,
 * so nothing here links out to pages that don't exist. Flight and Hotel point
 * at the real service routes that already exist in the site.
 *
 * Copy is factual and descriptive of what a planned journey covers. It makes
 * no guarantees, quotes no prices and cites no statistics.
 */

import { BedDouble, Camera, Car, Plane, UtensilsCrossed } from "lucide-react";

import { Link } from "../../compat/router";
import { Container, Reveal } from "../ui";

const items = [
  { icon: Plane, label: "Flights", note: "Ticketing & routing", to: "/flights" },
  { icon: BedDouble, label: "Hotels", note: "Handpicked stays", to: "/hotels" },
  { icon: Car, label: "Transport", note: "Private transfers", to: null },
  { icon: UtensilsCrossed, label: "Meals", note: "Cuisine to suit you", to: null },
  { icon: Camera, label: "Sightseeing", note: "Guided experiences", to: null },
] as const;

export function IncludedStrip() {
  return (
    <section aria-label="What a planned journey includes" className="bg-midnight py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon: Icon, label, note, to }, i) => {
            const inner = (
              <>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.07] text-gold-soft transition-colors group-hover:border-gold/60">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <span className="mt-3 block text-sm font-semibold text-ivory">{label}</span>
                <span className="mt-0.5 block text-[12px] text-sand/55">{note}</span>
              </>
            );

            return (
              <Reveal as="li" key={label} delay={i} className="text-center">
                {to ? (
                  <Link to={to} className="group block">
                    {inner}
                  </Link>
                ) : (
                  <div className="group block">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
