"use client";

/**
 * Horizontal-scroll story for the prime group destinations.
 *
 * Pinned vertically while the panels translate horizontally, then released
 * cleanly so the page continues as normal.
 *
 * Anti-trap contract (explicit requirement):
 *  - A persistent progress rail + "scroll" affordance is always visible.
 *  - The pin duration is bounded by the number of real panels.
 *  - Below `lg`, and for prefers-reduced-motion, there is NO pin at all — it
 *    degrades to a native swipeable scroller, which is the correct pattern on
 *    touch and never fights the browser's own scrolling.
 *  - Every panel is a real link, reachable by keyboard in normal DOM order.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "../../compat/router";
import { primeDestinations } from "@/lib/destinations";
import { Container, Img, Kicker } from "../ui";

export function PrimeStory() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setEnhanced(mq.matches && !motion.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    motion.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      motion.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const rootEl = root.current;
    const trackEl = track.current;
    if (!rootEl || !trackEl) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Distance the track must travel to reveal its overflow.
        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

        gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.9,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (rail.current) {
                rail.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      }, rootEl);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [enhanced]);

  const panels = primeDestinations;

  return (
    <section
      ref={root}
      aria-labelledby="prime-story-heading"
      className="relative isolate overflow-hidden bg-midnight py-16 lg:overflow-visible lg:py-0"
    >
      <div aria-hidden className="wayfinder-vignette absolute inset-0 -z-10" />

      <div className={enhanced ? "flex h-[100svh] flex-col justify-center" : ""}>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Kicker light>Prime Journeys</Kicker>
              <h2
                id="prime-story-heading"
                className="mt-4 font-display text-3xl leading-[1.08] text-balance text-ivory sm:text-4xl lg:text-5xl"
              >
                The destinations our{" "}
                <span className="text-champagne italic">groups</span> return to
              </h2>
            </div>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-sm text-sand/80 transition-colors hover:border-gold hover:text-ivory"
            >
              All destinations <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>

        {/* Track: GSAP-translated on desktop, native scroll everywhere else */}
        <div
          className={[
            "mt-10",
            enhanced
              ? "overflow-hidden"
              : "hide-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          ].join(" ")}
        >
          <ul
            ref={track}
            className="flex gap-5 px-5 will-change-transform md:px-8 lg:pr-[12vw] lg:pl-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]"
          >
            {panels.map((d, i) => (
              <li
                key={d.slug}
                className="w-[76vw] max-w-[380px] shrink-0 snap-start sm:w-[52vw] lg:w-[26vw]"
              >
                <Link to={`/destination/${d.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] ring-1 ring-sand/12">
                    <Img
                      src={d.hero}
                      alt={`${d.name}, ${d.country}`}
                      ratio="aspect-[3/4]"
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-transparent"
                    />
                    <span
                      aria-hidden
                      className="absolute top-4 left-4 font-display text-3xl text-gold-soft/50"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-semibold tracking-[0.24em] text-gold-soft uppercase">
                        {d.country}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl text-ivory">{d.name}</h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-sand/65">
                        {d.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Always-visible affordance: progress + explicit direction hint */}
        <Container className="mt-8">
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px flex-1 overflow-hidden bg-sand/12">
              <span
                ref={rail}
                className="block h-full origin-left scale-x-0 bg-gold/70"
                style={enhanced ? undefined : { transform: "scaleX(0)" }}
              />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.26em] text-sand/45 uppercase">
              {enhanced ? "Scroll to travel" : "Swipe to explore"}
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
