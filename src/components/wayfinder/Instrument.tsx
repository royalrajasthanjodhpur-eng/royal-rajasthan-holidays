"use client";

/**
 * "The Wayfinder" — an original brass armillary/astrolabe instrument built for
 * Royal Rajasthan Holidays.
 *
 * Design intent: a navigator's instrument, machined in brass and champagne
 * gold, floating in midnight blue. Concentric graduated rings on different
 * axes, an engraved origin core representing Jodhpur, and route arcs that
 * radiate outward to destination markers.
 *
 * Explicitly NOT a spinning globe: there is no sphere, no landmass texture, no
 * particle field. Motion is slow, weighted and instrument-like.
 *
 * Everything is procedural geometry — no external model or texture downloads,
 * so the scene costs nothing beyond the JS bundle.
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import type { Tier } from "@/lib/useCapability";
import { ORIGIN, primeNodes, outerNodes, routeArcs, type WayfinderNode } from "@/lib/wayfinder";

/* ── Palette (mirrors the CSS tokens so 3D and DOM stay in sync) ── */
const GOLD = "#d4b25a";
const GOLD_SOFT = "#e7c977";
const SAND = "#e8dcc8";
const MIDNIGHT = "#0b1e38";

/** Shared brass material — one instance, reused by every ring. */
function useBrassMaterial(tier: Tier) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        metalness: 0.92,
        roughness: tier === "full" ? 0.24 : 0.34,
        emissive: new THREE.Color(GOLD),
        emissiveIntensity: 0.06,
      }),
    [tier],
  );
}

/**
 * A single graduated ring of the armillary.
 * `graduations` adds the fine tick marks that make it read as an instrument
 * rather than a plain torus.
 */
function Ring({
  radius,
  tube,
  rotation,
  material,
  graduations = 0,
  speed = 0,
}: {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  material: THREE.Material;
  graduations?: number;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (speed !== 0 && group.current) {
      // Rotate about the ring's own axis for a slow mechanical drift.
      group.current.rotation.z += delta * speed;
    }
  });

  // Tick marks placed evenly around the ring's circumference.
  const ticks = useMemo(() => {
    if (graduations <= 0) return [];
    return Array.from({ length: graduations }, (_, i) => {
      const a = (i / graduations) * Math.PI * 2;
      const major = i % 5 === 0;
      return {
        key: i,
        position: [Math.cos(a) * radius, Math.sin(a) * radius, 0] as [number, number, number],
        rotation: [0, 0, a] as [number, number, number],
        length: major ? tube * 5 : tube * 2.6,
      };
    });
  }, [graduations, radius, tube]);

  return (
    <group ref={group} rotation={rotation}>
      <mesh material={material} castShadow={false} receiveShadow={false}>
        <torusGeometry args={[radius, tube, 8, 128]} />
      </mesh>
      {ticks.map((t) => (
        <mesh key={t.key} position={t.position} rotation={t.rotation} material={material}>
          <boxGeometry args={[t.length, tube * 0.85, tube * 0.85]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * The engraved origin core — Jodhpur.
 * A faceted brass polyhedron with a slow pulse, anchoring the instrument.
 */
function OriginCore({ tier }: { tier: Tier }) {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.14;
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (halo.current && tier === "full") {
      // Gentle breathing halo — the instrument's "heartbeat".
      const s = 1 + Math.sin(t * 1.1) * 0.055;
      halo.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color={GOLD_SOFT}
          metalness={0.95}
          roughness={0.18}
          emissive={new THREE.Color(GOLD)}
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.09} depthWrite={false} />
      </mesh>
    </group>
  );
}

/**
 * A route arc from the Jodhpur core to a destination marker.
 *
 * Symbolic only — a bowed bezier, not a flight path. A travelling highlight
 * runs along the tube to suggest departure without implying a real route.
 */
function RouteArc({
  to,
  control,
  delay,
  active,
  tier,
}: {
  to: [number, number, number];
  control: [number, number, number];
  delay: number;
  active: boolean;
  tier: Tier;
}) {
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...control),
        new THREE.Vector3(...to),
      ),
    [control, to],
  );

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, tier === "full" ? 48 : 24, 0.011, 6, false),
    [curve, tier],
  );

  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!material.current) return;
    const t = state.clock.elapsedTime * 0.32 + delay;
    // Sawtooth pulse so each arc brightens in staggered sequence.
    const pulse = (t % 1) ** 2;
    material.current.opacity = active ? 0.5 + pulse * 0.35 : 0.16 + pulse * 0.14;
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        ref={material}
        color={active ? GOLD_SOFT : GOLD}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * A destination marker engraved on a ring.
 * Hover/focus raises it and reports the destination upward for the DOM label —
 * the accessible name list lives in the DOM, not in WebGL.
 */
function Marker({
  node,
  active,
  onHover,
  onSelect,
  tier,
}: {
  node: WayfinderNode;
  active: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  tier: Tier;
}) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...node.position), [node.position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Subtle float keeps markers alive without drifting off their ring.
    const bob = tier === "full" ? Math.sin(t * 0.8 + node.theta * 3) * 0.035 : 0;
    const push = active ? 1.075 : 1;
    group.current.position.set(
      base.x * push,
      base.y * push + bob,
      base.z * push,
    );
    const s = active ? 1.5 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.slug);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.slug);
      }}
    >
      {/* Prime destinations get a larger, brighter gem. */}
      <mesh>
        <octahedronGeometry args={[node.prime ? 0.085 : 0.058, 0]} />
        <meshStandardMaterial
          color={active ? "#fff6df" : node.prime ? GOLD_SOFT : SAND}
          metalness={0.85}
          roughness={0.2}
          emissive={new THREE.Color(active ? GOLD_SOFT : GOLD)}
          emissiveIntensity={active ? 1.5 : node.prime ? 0.5 : 0.28}
        />
      </mesh>
      {/* Invisible larger hit area — small gems are hard to hit with a mouse. */}
      <mesh visible={false}>
        <sphereGeometry args={[0.22, 8, 8]} />
      </mesh>
    </group>
  );
}

export interface InstrumentProps {
  tier: Tier;
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  /** 0…1 scroll progress driving the camera choreography. */
  scrollProgress: React.MutableRefObject<number>;
}

export function Instrument({
  tier,
  activeSlug,
  onHover,
  onSelect,
  scrollProgress,
}: InstrumentProps) {
  const root = useRef<THREE.Group>(null);
  const brass = useBrassMaterial(tier);
  const [pointer] = useState(() => new THREE.Vector2());

  // On reduced tier, show prime nodes only — fewer draw calls, still meaningful.
  const nodes = useMemo(
    () => (tier === "full" ? [...primeNodes, ...outerNodes] : primeNodes),
    [tier],
  );

  useFrame((state, delta) => {
    if (!root.current) return;
    const p = scrollProgress.current;

    // Slow, weighted rotation — an instrument being turned, not a globe spinning.
    root.current.rotation.y += delta * (tier === "full" ? 0.055 : 0.03);

    // Scroll tilts the instrument, revealing its rings edge-on then face-on.
    const targetTilt = -0.42 + p * 0.72;
    root.current.rotation.x += (targetTilt - root.current.rotation.x) * 0.06;

    // Parallax: the instrument leans a little toward the pointer. Damped so it
    // never feels twitchy. Disabled on reduced tier (touch devices).
    if (tier === "full") {
      pointer.set(state.pointer.x, state.pointer.y);
      const targetZ = pointer.x * 0.06;
      root.current.rotation.z += (targetZ - root.current.rotation.z) * 0.04;
    }

    // Gentle scale-in as the section is entered.
    const targetScale = 0.82 + Math.min(p, 0.5) * 0.36;
    const s = root.current.scale.x + (targetScale - root.current.scale.x) * 0.06;
    root.current.scale.setScalar(s);
  });

  return (
    <group ref={root} scale={0.82}>
      {/* ── Armillary rings on distinct axes ── */}
      <Ring
        radius={2.55}
        tube={0.022}
        rotation={[Math.PI / 2, 0, 0]}
        material={brass}
        graduations={tier === "full" ? 60 : 0}
        speed={0.02}
      />
      <Ring
        radius={3.05}
        tube={0.017}
        rotation={[Math.PI / 2.35, 0.35, 0]}
        material={brass}
        graduations={tier === "full" ? 40 : 0}
        speed={-0.014}
      />
      <Ring
        radius={3.75}
        tube={0.014}
        rotation={[Math.PI / 1.85, -0.28, 0.2]}
        material={brass}
        speed={0.009}
      />
      {/* Meridian ring — the vertical hoop of a classical armillary. */}
      <Ring radius={4.15} tube={0.012} rotation={[0, 0.4, 0]} material={brass} speed={0} />

      {/* ── Origin: Jodhpur ── */}
      <OriginCore tier={tier} />

      {/* ── Route arcs from the origin to prime destinations ── */}
      {routeArcs.map((arc) => (
        <RouteArc
          key={arc.slug}
          to={arc.to}
          control={arc.control}
          delay={arc.delay}
          active={activeSlug === arc.slug}
          tier={tier}
        />
      ))}

      {/* ── Destination markers ── */}
      {nodes.map((n) => (
        <Marker
          key={n.slug}
          node={n}
          active={activeSlug === n.slug}
          onHover={onHover}
          onSelect={onSelect}
          tier={tier}
        />
      ))}

      {/* ── Lighting: warm key + cool rim, tuned for brass on midnight ── */}
      <ambientLight intensity={0.55} color={SAND} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color={GOLD_SOFT} />
      <directionalLight position={[-5, -2, -4]} intensity={0.85} color="#7fa8d8" />
      <pointLight position={[0, 0, 0]} intensity={2.2} color={GOLD} distance={6} decay={2} />
      <hemisphereLight args={[SAND, MIDNIGHT, 0.35]} />
    </group>
  );
}

export { ORIGIN };
