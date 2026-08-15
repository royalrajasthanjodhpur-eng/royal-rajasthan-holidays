"use client";

/**
 * The Wayfinder section — capability-aware host for the 3D instrument.
 *
 * Responsibilities:
 *  1. Detect device capability and pick a tier (full / reduced / static).
 *  2. Lazy-load the WebGL bundle ONLY for tiers that can use it.
 *  3. Track scroll progress and feed it to the camera choreography via a ref
 *     (a ref, not state — this must not re-render React 60 times a second).
 *  4. Render an accessible DOM destination list that works with or without 3D.
 *
 * The 3D scene is never the only route to the content: every destination is a
 * real, focusable link in the DOM, and the list is keyboard-navigable.
 */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass } from "lucide-react";

import { Link, useNavigate } from "../../compat/router";
import { Container, Kicker } from "../ui";
import { useCapability } from "@/lib/useCapability";
import {
  ORIGIN,
  destinationCount,
  internationalCount,
  primeNodes,
  outerNodes,
} from "@/lib/wayfinder";
import { WayfinderStatic } from "./WayfinderStatic";

/**
 * three.js + R3F are pulled in only when this component mounts, and it is only
 * mounted for capable devices. ssr:false because WebGL has no server render.
 */
const WayfinderCanvas = dynamic(() => import("./WayfinderCanvas"), {
  ssr: false,
  loading: () => <WayfinderStatic />,
});

export function Wayfinder() {
  const { tier, ready, dpr } = useCapability();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [glFailed, setGlFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const navigate = useNavigate();

  /**
   * Scroll progress for the camera. Written to a ref and read inside
   * useFrame, so scrolling never triggers a React re-render.
   */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top reaches the viewport bottom, 1 when its
      // bottom passes the viewport top.
      const total = rect.height + vh;
      const seen = vh - rect.top;
      scrollProgress.current = Math.min(1, Math.max(0, seen / total));
    };

    const onScroll = () => {
      // rAF-throttled: at most one measurement per frame.
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      navigate(`/destination/${slug}`);
    },
    [navigate],
  );

  const handleContextLost = useCallback(() => setGlFailed(true), []);

  // Render 3D only for capable tiers, once detection has finished, and only if
  // the GL context hasn't failed. Everything else gets the SVG instrument.
  const use3D = ready && !glFailed && (tier === "full" || tier === "reduced");

  const activeNode =
    [...primeNodes, ...outerNodes].find((n) => n.slug === activeSlug) ?? null;

  return (
    <section
      ref={sectionRef}
      id="wayfinder"
      aria-labelledby="wayfinder-heading"
      className="relative isolate overflow-hidden bg-midnight py-20 md:py-28 lg:py-32"
    >
      {/* Depth: warm vignette + engraved grid, pure CSS */}
      <div aria-hidden className="wayfinder-vignette absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,220,200,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,220,200,.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker light>The Wayfinder</Kicker>
          <h2
            id="wayfinder-heading"
            className="mt-5 font-display text-3xl leading-[1.08] text-balance text-ivory sm:text-4xl lg:text-5xl"
          >
            Set your bearing from{" "}
            <span className="text-champagne italic">{ORIGIN.city}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-sand/70">
            Our navigator&rsquo;s instrument, centred on the city we work from. Every
            marker is a destination we plan by hand — {internationalCount} international
            and {destinationCount - internationalCount} across India.
          </p>
        </div>

        {/* ── The instrument ── */}
        <div className="relative mt-12 h-[clamp(320px,52vw,600px)] w-full">
          {use3D && tier ? (
            <WayfinderCanvas
              tier={tier}
              dpr={dpr}
              activeSlug={activeSlug}
              onHover={setActiveSlug}
              onSelect={handleSelect}
              scrollProgress={scrollProgress}
              onContextLost={handleContextLost}
            />
          ) : (
            <WayfinderStatic animated={ready && tier !== "static"} />
          )}

          {/* Origin plate — always in the DOM, readable in every tier */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sand/15 bg-midnight/70 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-sand/80 uppercase backdrop-blur">
              <Compass aria-hidden className="h-3.5 w-3.5 text-gold-soft" />
              Origin · {ORIGIN.label}
            </span>
          </div>

          {/* Hover readout for the 3D instrument (decorative; the list below is
              the accessible source of truth). */}
          {use3D && activeNode && (
            <div
              aria-hidden
              className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="font-display text-2xl text-ivory">{activeNode.name}</p>
              <p className="mt-1 text-[11px] tracking-[0.2em] text-gold-soft uppercase">
                {activeNode.country}
              </p>
            </div>
          )}
        </div>

        {/* ── Accessible destination list ──
            This is the real navigation. It is present for every tier, works
            with a keyboard and a screen reader, and hovering it also drives the
            3D highlight, so both paths stay in sync. */}
        <div className="mt-12">
          <h3 className="text-center text-[11px] font-semibold tracking-[0.28em] text-sand/50 uppercase">
            Prime destinations on the inner ring
          </h3>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {primeNodes.map((n) => (
              <li key={n.slug}>
                <Link
                  to={`/destination/${n.slug}`}
                  onMouseEnter={() => setActiveSlug(n.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(n.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className={[
                    "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                    activeSlug === n.slug
                      ? "border-gold/60 bg-gold/15 text-ivory"
                      : "border-sand/15 text-sand/75 hover:border-gold/40 hover:text-ivory",
                  ].join(" ")}
                >
                  {n.name}
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 border-b border-gold/40 pb-1 font-display text-lg text-ivory transition-colors hover:border-gold hover:text-gold-soft"
            >
              View all {destinationCount} destinations
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
