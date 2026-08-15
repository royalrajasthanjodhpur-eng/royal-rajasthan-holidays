"use client";

/**
 * The WebGL host for the Wayfinder instrument.
 *
 * This module is lazy-loaded (see Wayfinder.tsx), so three.js and
 * @react-three/fiber are only downloaded by devices that passed capability
 * detection. Low-end, no-WebGL and reduced-motion visitors never pay for it.
 */

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import type { Tier } from "@/lib/useCapability";
import { Instrument } from "./Instrument";

export interface WayfinderCanvasProps {
  tier: Tier;
  dpr: [number, number];
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  scrollProgress: React.MutableRefObject<number>;
  /** Called if the GL context is lost so the parent can fall back to static. */
  onContextLost: () => void;
}

export default function WayfinderCanvas({
  tier,
  dpr,
  activeSlug,
  onHover,
  onSelect,
  scrollProgress,
  onContextLost,
}: WayfinderCanvasProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  /**
   * Pause rendering when the instrument is off-screen or the tab is hidden.
   * A continuously animating canvas that nobody can see is wasted battery.
   */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /**
   * A lost GL context (driver reset, tab backgrounded too long, OOM) would
   * otherwise leave a blank rectangle. Escalate so the parent swaps in the
   * static fallback and the section keeps working.
   */
  useEffect(() => {
    const el = wrap.current?.querySelector("canvas");
    if (!el) return;
    const handler = (e: Event) => {
      e.preventDefault();
      onContextLost();
    };
    el.addEventListener("webglcontextlost", handler);
    return () => el.removeEventListener("webglcontextlost", handler);
  }, [onContextLost]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        // Decorative: the accessible destination list lives in the DOM overlay.
        aria-hidden
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.6, 9.2], fov: 42, near: 0.1, far: 60 }}
        gl={{
          antialias: tier === "full",
          alpha: true,
          powerPreference: "high-performance",
          // Cheaper: we never read pixels back or need a stencil buffer.
          stencil: false,
          depth: true,
        }}
        // Transparent so the CSS midnight gradient shows through.
        style={{ background: "transparent" }}
      >
        <Instrument
          tier={tier}
          activeSlug={activeSlug}
          onHover={onHover}
          onSelect={onSelect}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}
