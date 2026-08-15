"use client";

/**
 * "FROM RAJASTHAN TO THE WORLD" — the signature scroll-driven scene.
 *
 * A pinned sequence that carries the visitor from the Jodhpur origin outward
 * to the wider world, told in three chapters over a scroll distance.
 *
 * Direction: modern editorial motion design — oversized Playfair type, wide
 * letter-spaced kickers, deep midnight ground, champagne-gold accents,
 * generous negative space. Deliberately NOT wedding-card or folk-decoration
 * styling.
 *
 * GSAP + ScrollTrigger drive this because it is scroll-linked choreography
 * with pinning — the one job Framer Motion doesn't do as cleanly. Framer
 * Motion continues to own the enter/reveal animations everywhere else.
 *
 * Accessibility: with prefers-reduced-motion the pin and all tweens are
 * skipped and the three chapters render as a plain, fully readable stacked
 * layout. No content lives only inside an animation.
 */

import { useEffect, useRef, useState } from "react";

import { journeyChapters, ORIGIN } from "@/lib/wayfinder";
import { Container } from "../ui";

export function JourneyScene() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(true); // assume reduced until proven otherwise

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const rootEl = root.current;
    const trackEl = track.current;
    if (!rootEl || !trackEl) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    // GSAP is loaded on demand so it stays out of the initial bundle.
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");

        // Pin the scene and cross-fade the chapters as the user scrolls.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${window.innerHeight * (chapters.length - 0.35)}`,
            scrub: 0.8,
            pin: trackEl,
            // Avoids layout shift when the pin engages/releases.
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        chapters.forEach((ch, i) => {
          const heading = ch.querySelector("[data-chapter-title]");
          const body = ch.querySelector("[data-chapter-body]");
          const kicker = ch.querySelector("[data-chapter-kicker]");

          if (i > 0) {
            tl.fromTo(
              ch,
              { autoAlpha: 0, y: 60 },
              { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
              i,
            );
          }

          // Depth: each layer moves at a slightly different rate (parallax).
          if (kicker) tl.fromTo(kicker, { y: 24 }, { y: -16, duration: 1.6, ease: "none" }, i);
          if (heading) tl.fromTo(heading, { y: 40 }, { y: -34, duration: 1.6, ease: "none" }, i);
          if (body) tl.fromTo(body, { y: 30 }, { y: -20, duration: 1.6, ease: "none" }, i);

          if (i < chapters.length - 1) {
            tl.to(ch, { autoAlpha: 0, y: -60, duration: 1, ease: "power2.in" }, i + 0.85);
          }
        });

        // The horizon line widens as the journey progresses.
        gsap.fromTo(
          "[data-horizon]",
          { scaleX: 0.15 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootEl,
              start: "top top",
              end: () => `+=${window.innerHeight * 2}`,
              scrub: 1,
            },
          },
        );
      }, rootEl);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  /* ── Reduced-motion / no-JS layout: plain, readable, no pinning ── */
  if (reduced) {
    return (
      <section
        aria-labelledby="journey-heading"
        className="relative isolate overflow-hidden bg-midnight py-20 md:py-28"
      >
        <div aria-hidden className="wayfinder-vignette absolute inset-0 -z-10" />
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2
              id="journey-heading"
              className="font-display text-4xl leading-[1.05] text-balance text-ivory sm:text-5xl"
            >
              From <span className="text-champagne italic">Rajasthan</span> to the World
            </h2>
            <div className="mt-12 space-y-12">
              {journeyChapters.map((c) => (
                <article key={c.id}>
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
                    {c.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ivory sm:text-3xl">{c.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-sand/70">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  /* ── Full cinematic layout ── */
  return (
    <section
      ref={root}
      aria-labelledby="journey-heading"
      className="relative isolate bg-midnight"
    >
      <div ref={track} className="relative h-[100svh] overflow-hidden">
        <div aria-hidden className="wayfinder-vignette absolute inset-0" />

        {/* Horizon line — the thread from Jodhpur outward */}
        <div
          aria-hidden
          data-horizon
          className="rule-engraved absolute top-1/2 left-0 h-px w-full origin-left"
        />

        {/* Origin plate, fixed while pinned */}
        <div
          aria-hidden
          className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.3em] text-sand/40 uppercase"
        >
          {ORIGIN.label}
        </div>

        <Container className="relative flex h-full items-center">
          <div className="relative mx-auto w-full max-w-3xl">
            {/* Section heading, read by assistive tech before the chapters */}
            <h2 id="journey-heading" className="sr-only">
              From Rajasthan to the World
            </h2>

            {journeyChapters.map((c, i) => (
              <article
                key={c.id}
                data-chapter
                // Chapters stack; only the first is visible initially.
                className={[
                  "absolute inset-x-0 top-1/2 -translate-y-1/2",
                  i === 0 ? "" : "invisible opacity-0",
                ].join(" ")}
              >
                <p
                  data-chapter-kicker
                  className="text-[11px] font-semibold tracking-[0.3em] text-gold-soft uppercase"
                >
                  {c.kicker}
                </p>
                <h3
                  data-chapter-title
                  className="mt-4 font-display text-[2.4rem] leading-[1.02] text-balance text-ivory sm:text-6xl lg:text-7xl"
                >
                  {c.id === "world" ? (
                    <>
                      From <span className="text-champagne italic">Rajasthan</span>
                      <br />
                      to the World
                    </>
                  ) : (
                    c.title
                  )}
                </h3>
                <p
                  data-chapter-body
                  className="mt-6 max-w-lg text-base leading-relaxed text-sand/70 sm:text-lg"
                >
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </Container>

        {/* Scroll affordance — the user must never feel trapped in the pin */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-sand/45"
        >
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">
            Keep scrolling
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
