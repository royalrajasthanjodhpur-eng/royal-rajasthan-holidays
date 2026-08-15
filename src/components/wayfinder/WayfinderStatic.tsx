"use client";

/**
 * Lightweight fallback for the Wayfinder.
 *
 * Shown when: WebGL is unavailable, the device is low-powered, the visitor is
 * on a data saver, or prefers-reduced-motion is set. It is a pure SVG
 * rendering of the same instrument — concentric graduated rings, an engraved
 * Jodhpur origin, and route lines to the prime destinations.
 *
 * This is a genuine visual, not a grey box: the section keeps its cinematic
 * character at a fraction of the cost, with zero WebGL and no JS animation.
 */

import { primeNodes, ORIGIN } from "@/lib/wayfinder";

export function WayfinderStatic({ animated = false }: { animated?: boolean }) {
  // Project the instrument's 3D node positions to 2D using the same data, so
  // the fallback composition matches the WebGL version rather than diverging.
  const points = primeNodes.map((n) => {
    const [x, y, z] = n.position;
    // Simple isometric-ish projection; depth (z) compresses toward the centre.
    const px = 200 + (x * 34 + z * 12);
    const py = 200 - (y * 40 - z * 8);
    return { ...n, px, py };
  });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="h-full max-h-[560px] w-full max-w-[560px]"
        role="img"
        aria-label={`An armillary instrument centred on ${ORIGIN.label}, with routes radiating to our prime destinations.`}
      >
        <defs>
          <radialGradient id="wf-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fff6df" />
            <stop offset="55%" stopColor="#e7c977" />
            <stop offset="100%" stopColor="#d4b25a" />
          </radialGradient>
          <linearGradient id="wf-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8dcc8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#e7c977" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4b25a" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="wf-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#d4b25a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4b25a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warm halo behind the instrument */}
        <circle cx="200" cy="200" r="170" fill="url(#wf-glow)" />

        {/* Graduated armillary rings, drawn as ellipses on different axes */}
        <g
          fill="none"
          stroke="url(#wf-ring)"
          className={animated ? "origin-center motion-safe:animate-[wf-turn_48s_linear_infinite]" : undefined}
        >
          <ellipse cx="200" cy="200" rx="150" ry="52" strokeWidth="1.4" />
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="52"
            strokeWidth="1"
            transform="rotate(58 200 200)"
            opacity="0.65"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="52"
            strokeWidth="1"
            transform="rotate(-58 200 200)"
            opacity="0.65"
          />
          <circle cx="200" cy="200" r="150" strokeWidth="1.1" opacity="0.5" />
          <circle cx="200" cy="200" r="118" strokeWidth="0.8" opacity="0.35" />
        </g>

        {/* Graduation ticks around the outer ring */}
        <g stroke="#e8dcc8" strokeWidth="1" opacity="0.4">
          {Array.from({ length: 48 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const major = i % 4 === 0;
            const r1 = 150;
            const r2 = 150 - (major ? 9 : 4.5);
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * r1}
                y1={200 + Math.sin(a) * r1}
                x2={200 + Math.cos(a) * r2}
                y2={200 + Math.sin(a) * r2}
                opacity={major ? 0.8 : 0.35}
              />
            );
          })}
        </g>

        {/* Route lines from Jodhpur to each prime destination */}
        <g fill="none" stroke="#d4b25a" strokeWidth="0.9" opacity="0.5">
          {points.map((p) => (
            <path
              key={p.slug}
              d={`M 200 200 Q ${(200 + p.px) / 2} ${(200 + p.py) / 2 - 26} ${p.px} ${p.py}`}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Destination markers */}
        <g>
          {points.map((p) => (
            <g key={p.slug}>
              <circle cx={p.px} cy={p.py} r="5.5" fill="#d4b25a" opacity="0.22" />
              <circle cx={p.px} cy={p.py} r="2.6" fill="#e7c977" />
            </g>
          ))}
        </g>

        {/* The Jodhpur origin core */}
        <circle cx="200" cy="200" r="16" fill="#d4b25a" opacity="0.16" />
        <circle cx="200" cy="200" r="7.5" fill="url(#wf-core)" />
      </svg>
    </div>
  );
}
