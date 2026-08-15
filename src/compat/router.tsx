"use client";

/**
 * react-router-dom → Next.js App Router compatibility layer.
 *
 * The original SPA used HashRouter. Moving to the App Router gives us the clean,
 * crawlable URLs that public/sitemap.xml already promises, plus server rendering
 * for the database-backed pages.
 *
 * Rather than rewriting ~15 components (and risking visual regressions), this
 * module re-implements the small surface of react-router-dom that the codebase
 * actually uses, backed by next/link and next/navigation. Every consuming
 * component keeps its exact JSX and class names.
 *
 * Surface in use: Link, useLocation, useParams, useNavigate, Navigate.
 */

import NextLink from "next/link";
import {
  useRouter,
  usePathname,
  useParams as useNextParams,
} from "next/navigation";
import {
  useEffect,
  useState,
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from "react";

/* ── navigation state ────────────────────────────────────── */

/**
 * react-router carries `state` through navigate(to, { state }) in the history
 * entry. The App Router has no equivalent, so we persist one pending state
 * object in sessionStorage keyed by its target path. sessionStorage (not
 * localStorage) keeps it tab-scoped and survives a reload, which matches
 * react-router's behaviour. Only non-sensitive UI data is ever stored here.
 */
const NAV_STATE_KEY = "rrh:nav-state";

interface StoredNavState {
  path: string;
  state: unknown;
}

function writeNavState(path: string, state: unknown) {
  if (typeof window === "undefined") return;
  try {
    if (state === undefined || state === null) {
      window.sessionStorage.removeItem(NAV_STATE_KEY);
      return;
    }
    const payload: StoredNavState = { path, state };
    window.sessionStorage.setItem(NAV_STATE_KEY, JSON.stringify(payload));
  } catch {
    /* Private mode / quota — personalisation is optional, never fatal. */
  }
}

function readNavState(path: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(NAV_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredNavState;
    return parsed?.path === path ? parsed.state : null;
  } catch {
    return null;
  }
}

/* ── <Link to="..."> ─────────────────────────────────────── */

type NextLinkProps = Omit<ComponentProps<typeof NextLink>, "href">;

export interface LinkProps extends NextLinkProps {
  to: string;
  children?: ReactNode;
}

/**
 * Drop-in for react-router's <Link to>. Maps `to` → `href`.
 * Next.js prefetches these automatically, so navigation stays instant.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...rest },
  ref,
) {
  return (
    <NextLink ref={ref} href={to} {...rest}>
      {children}
    </NextLink>
  );
});

/* ── useLocation() ───────────────────────────────────────── */

/**
 * Note: `search` is intentionally NOT read from useSearchParams(). Doing so
 * would opt every consuming page out of static rendering (Next.js requires a
 * Suspense boundary around useSearchParams). No component in this codebase
 * reads `location.search`, so the cheaper pathname-only implementation is used.
 * If query-string access is ever needed, call useSearchParams() directly in
 * that component and wrap it in <Suspense>.
 */
export function useLocation() {
  const pathname = usePathname() ?? "/";

  // Read after mount: the server render has no sessionStorage, so reading it
  // during render would cause a hydration mismatch. Consumers treat `state` as
  // optional, so the first paint simply shows the non-personalised copy.
  const [state, setState] = useState<unknown>(null);
  useEffect(() => {
    setState(readNavState(pathname));
  }, [pathname]);

  return {
    pathname,
    search: "",
    hash: "",
    state,
    key: pathname,
  };
}

/* ── useParams() ─────────────────────────────────────────── */

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
>(): T {
  return (useNextParams() ?? {}) as T;
}

/* ── useNavigate() ───────────────────────────────────────── */

export interface NavigateOptions {
  replace?: boolean;
  state?: unknown;
}

/**
 * Returns a navigate(to, options) function. Numeric argument (-1) maps to
 * router.back(), matching react-router semantics used by EnquiryForm.
 */
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, options: NavigateOptions = {}) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    writeNavState(to, options.state);
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

/* ── <Navigate to="..." replace /> ───────────────────────── */

/**
 * Declarative redirect. In the App Router most "not found" cases are better
 * served by notFound(), but several pages render <Navigate> from client
 * components, so this preserves that behaviour without a visual flash.
 */
export function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
  state?: unknown;
}) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
}
