/**
 * Wayfinder instrument model.
 *
 * IMPORTANT — this is deliberately NOT a map.
 *
 * The destination records in src/lib/destinations.ts contain no latitude or
 * longitude, and inventing coordinates, flight paths or distances is out of
 * scope for this project. So the Wayfinder is modelled as a navigational
 * *instrument* rather than a globe: destinations are engraved onto the rings of
 * an armillary/astrolabe at deterministic compositional positions.
 *
 * Nothing here claims geographic accuracy. Positions are derived from the
 * destination's index in the real dataset via a fixed golden-angle
 * distribution, which yields an even, non-clumping arrangement that is stable
 * across renders and builds (no randomness, so SSR and client agree).
 *
 * Jodhpur is the fixed origin at the centre of the instrument — the home city
 * of Royal Rajasthan Holidays, from which every route radiates.
 */

import {
  destinations,
  internationalDestinations,
  primeDestinations,
  type Destination,
} from "./destinations";

/** The instrument's origin: the company's home city. */
export const ORIGIN = {
  city: "Jodhpur",
  state: "Rajasthan",
  country: "India",
  label: "Jodhpur, Rajasthan",
} as const;

export interface WayfinderNode {
  slug: string;
  name: string;
  country: string;
  region: "international" | "domestic";
  tagline: string;
  hero: string;
  ribbon?: string;
  prime: boolean;
  /** Position on the instrument in 3D space (world units). */
  position: [number, number, number];
  /** Which concentric ring this node is engraved on (0 = innermost). */
  ring: number;
  /** Angle in radians around the instrument's vertical axis. */
  theta: number;
  /** Normalised elevation, -1 (south) … 1 (north), for ring tilt. */
  elevation: number;
}

/** Golden angle — gives an even, organic distribution with zero clumping. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Distributes n nodes across a sphere shell using a Fibonacci lattice.
 * Deterministic: the same index always yields the same point.
 */
function fibonacciPoint(index: number, total: number, radius: number) {
  // y walks evenly from +1 to -1; the golden angle spins each successive point.
  const y = total === 1 ? 0 : 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * index;
  return {
    position: [
      Math.cos(theta) * r * radius,
      // Compress vertically so the arrangement reads as a banded instrument
      // rather than a ball of points.
      y * radius * 0.52,
      Math.sin(theta) * r * radius,
    ] as [number, number, number],
    theta,
    elevation: y,
  };
}

/**
 * Builds the instrument's node set from real destination records.
 *
 * Prime destinations sit on the inner ring (closest to the origin core, most
 * prominent); the remaining international destinations occupy the outer ring.
 * Domestic destinations are surfaced through the India ring in the UI rather
 * than as orbiting markers, keeping the instrument legible.
 */
function buildNodes(source: Destination[], radius: number, ring: number): WayfinderNode[] {
  return source.map((d, i) => {
    const { position, theta, elevation } = fibonacciPoint(i, source.length, radius);
    return {
      slug: d.slug,
      name: d.name,
      country: d.country,
      region: d.region,
      tagline: d.tagline,
      hero: d.hero,
      ribbon: d.ribbon,
      prime: Boolean(d.prime),
      position,
      ring,
      theta,
      elevation,
    };
  });
}

/** Inner ring — the prime group destinations, drawn from the real dataset. */
export const primeNodes: WayfinderNode[] = buildNodes(primeDestinations, 2.55, 0);

/** Outer ring — remaining international destinations. */
export const outerNodes: WayfinderNode[] = buildNodes(
  internationalDestinations.filter((d) => !d.prime),
  3.75,
  1,
);

/** Every node engraved on the instrument. */
export const wayfinderNodes: WayfinderNode[] = [...primeNodes, ...outerNodes];

/**
 * Route arcs radiate from the Jodhpur origin core to each prime node.
 * These are symbolic connections between real destinations we actually sell —
 * they are not flight paths and encode no distance or bearing.
 */
export interface RouteArc {
  slug: string;
  name: string;
  to: [number, number, number];
  /** Control point for the quadratic bezier, lifted above the chord. */
  control: [number, number, number];
  /** Staggered start offset (0…1) so routes draw in sequence, not all at once. */
  delay: number;
}

export const routeArcs: RouteArc[] = primeNodes.map((n, i) => {
  const [x, y, z] = n.position;
  // Lift the control point above the midpoint so each arc bows outward,
  // reading as a travelled path rather than a straight line.
  const lift = 1.15;
  return {
    slug: n.slug,
    name: n.name,
    to: n.position,
    control: [x * 0.5, y * 0.5 + lift, z * 0.5],
    delay: primeNodes.length === 0 ? 0 : i / primeNodes.length,
  };
});

/**
 * Chapter definitions for the scroll-driven journey.
 * Copy is descriptive of the real business only — no statistics or claims.
 */
export interface Chapter {
  id: string;
  kicker: string;
  title: string;
  body: string;
}

export const journeyChapters: Chapter[] = [
  {
    id: "origin",
    kicker: "The Origin",
    title: "It begins in Jodhpur",
    body: `A doorway on D Road, Sardarpura. Since ${2005}, every journey we design has started with a conversation here — in the blue city, under Rajasthan light.`,
  },
  {
    id: "instrument",
    kicker: "The Instrument",
    title: "Set your bearing",
    body: "Turn the Wayfinder. Each marker is a destination we plan by hand — the inner ring holds our prime group journeys, the outer ring the wider world.",
  },
  {
    id: "world",
    kicker: "The World",
    title: "From Rajasthan to the world",
    body: "Beaches, mountains, deserts and cities across Asia, Africa, Europe and the Indian Ocean — paced to the people travelling, never sold from a shelf.",
  },
];

/** Total destination count, derived (not asserted) from the real dataset. */
export const destinationCount = destinations.length;
export const internationalCount = internationalDestinations.length;
