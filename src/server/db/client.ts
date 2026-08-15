import "server-only";

import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

import * as schema from "./schema";

/**
 * Lazy database client — follows the pattern documented in README §3.
 *
 * The client is created on FIRST USE, never at module load. This is what allows
 * every marketing page to build and render with DATABASE_URL unset: the module
 * can be imported freely, and only code paths that actually query will throw.
 */

type NeonDb = ReturnType<typeof drizzleNeon<typeof schema>>;
type PgDb = ReturnType<typeof drizzlePostgres<typeof schema>>;
export type Database = NeonDb | PgDb;

let cached: Database | null = null;

/** True when a database connection string is configured. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Returns the Drizzle client, creating it on first call.
 * Throws only when invoked without DATABASE_URL — never at import time.
 */
export function getDb(): Database {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Database-backed features are unavailable; " +
        "static marketing pages continue to work without it.",
    );
  }

  // Neon serverless driver over HTTP in production; plain TCP locally so the
  // exact same schema and queries can be tested against a local Postgres.
  const isNeon = /neon\.tech|neon\.build/.test(url);

  if (isNeon) {
    cached = drizzleNeon(neon(url), { schema });
  } else {
    const client = postgres(url, { max: 5, prepare: false });
    cached = drizzlePostgres(client, { schema });
  }

  return cached;
}

/**
 * Safe wrapper for pages that should degrade gracefully rather than error
 * when the database is unreachable or unconfigured.
 */
export async function tryDb<T>(
  fn: (db: Database) => Promise<T>,
  fallback: T,
): Promise<T> {
  if (!isDatabaseConfigured()) return fallback;
  try {
    return await fn(getDb());
  } catch (error) {
    console.error("[db] query failed, serving fallback:", error);
    return fallback;
  }
}

export { schema };
