/**
 * Drizzle schema — Royal Rajasthan Holidays
 *
 * Content that already exists in `src/lib/destinations.ts` and `src/lib/content.ts`
 * is migrated verbatim by `scripts/seed.ts`. Tables that would require inventing
 * business facts (guest_gallery, testimonials) are created empty and stay empty
 * until the owner supplies real content through the admin CMS.
 */
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

/* ── enums ───────────────────────────────────────────────── */

/**
 * Enquiry pipeline. NOTE: README.md documents `new|follow_up|confirmed|cancelled`
 * while the current brief specifies these five. The five-status pipeline wins;
 * the divergence is flagged in the delivery report for the owner to confirm.
 */
export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "in_progress",
  "converted",
  "closed",
]);

export const destinationKindEnum = pgEnum("destination_kind", [
  "international",
  "domestic",
]);

export const adminRoleEnum = pgEnum("admin_role", ["owner", "editor"]);

/* ── auth ────────────────────────────────────────────────── */

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    // bcrypt hash only — never a plaintext password.
    passwordHash: text("password_hash").notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    role: adminRoleEnum("role").notNull().default("editor"),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("admin_users_email_key").on(t.email)],
);

/* ── destinations ────────────────────────────────────────── */

export const destinations = pgTable(
  "destinations",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    country: varchar("country", { length: 160 }).notNull(),
    region: varchar("region", { length: 160 }).notNull(),
    kind: destinationKindEnum("kind").notNull(),
    isPrime: boolean("is_prime").notNull().default(false),
    ribbon: varchar("ribbon", { length: 120 }),
    tagline: text("tagline").notNull(),
    overview: text("overview").notNull(),
    heroImage: text("hero_image"),
    bestTime: varchar("best_time", { length: 240 }),
    bestTimeNote: text("best_time_note"),
    visa: text("visa"),
    // Arrays/objects preserved verbatim from src/lib/destinations.ts
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    whyVisit: jsonb("why_visit").$type<string[]>().notNull().default([]),
    idealFor: jsonb("ideal_for").$type<string[]>().notNull().default([]),
    attractions: jsonb("attractions")
      .$type<{ name: string; desc: string }[]>()
      .notNull()
      .default([]),
    experiences: jsonb("experiences").$type<string[]>().notNull().default([]),
    hotels: jsonb("hotels").$type<string[]>().notNull().default([]),
    related: jsonb("related").$type<string[]>().notNull().default([]),
    faqs: jsonb("faqs")
      .$type<{ q: string; a: string }[]>()
      .notNull()
      .default([]),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    // SEO — migrated verbatim from useSeo.ts call sites.
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("destinations_slug_key").on(t.slug),
    index("destinations_kind_idx").on(t.kind),
    index("destinations_prime_idx").on(t.isPrime),
  ],
);

export const destinationImages = pgTable(
  "destination_images",
  {
    id: serial("id").primaryKey(),
    destinationId: integer("destination_id")
      .notNull()
      .references(() => destinations.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt").notNull().default(""),
    caption: text("caption"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("destination_images_dest_idx").on(t.destinationId)],
);

/* ── catalogue content ───────────────────────────────────── */

export const holidayTypes = pgTable(
  "holiday_types",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    blurb: text("blurb").notNull(),
    intro: text("intro").notNull().default(""),
    image: text("image"),
    icon: varchar("icon", { length: 80 }),
    highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
    suited: jsonb("suited").$type<string[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("holiday_types_slug_key").on(t.slug)],
);

export const services = pgTable(
  "services",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    kicker: varchar("kicker", { length: 200 }),
    intro: text("intro").notNull(),
    hero: text("hero"),
    sections: jsonb("sections")
      .$type<{ title: string; body: string; items: string[] }[]>()
      .notNull()
      .default([]),
    faqs: jsonb("faqs").$type<{ q: string; a: string }[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("services_slug_key").on(t.slug)],
);

/* ── gallery ─────────────────────────────────────────────── */

export const galleryCategories = pgTable(
  "gallery_categories",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull(),
    label: varchar("label", { length: 160 }).notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
  },
  (t) => [uniqueIndex("gallery_categories_slug_key").on(t.slug)],
);

/**
 * Real guest photographs with consent. Intentionally EMPTY at seed time —
 * no guest names, stories or testimonials may ever be invented.
 */
export const guestGallery = pgTable(
  "guest_gallery",
  {
    id: serial("id").primaryKey(),
    imageUrl: text("image_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    alt: text("alt").notNull().default(""),
    caption: text("caption"),
    guestName: varchar("guest_name", { length: 160 }),
    destinationId: integer("destination_id").references(() => destinations.id, {
      onDelete: "set null",
    }),
    destinationLabel: varchar("destination_label", { length: 160 }),
    categoryId: integer("category_id").references(() => galleryCategories.id, {
      onDelete: "set null",
    }),
    travelDate: varchar("travel_date", { length: 60 }),
    tripType: varchar("trip_type", { length: 120 }),
    story: text("story"),
    testimonial: text("testimonial"),
    consentGiven: boolean("consent_given").notNull().default(false),
    isPublished: boolean("is_published").notNull().default(false),
    isFeatured: boolean("is_featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    width: integer("width"),
    height: integer("height"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("guest_gallery_published_idx").on(t.isPublished),
    index("guest_gallery_category_idx").on(t.categoryId),
  ],
);

/**
 * Every uploaded asset. The 64 existing photographs in /public/gallery are
 * imported here UNPUBLISHED so the owner can categorise them in the admin CMS.
 */
export const mediaLibrary = pgTable(
  "media_library",
  {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    publicId: text("public_id"),
    filename: varchar("filename", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 120 }),
    bytes: integer("bytes"),
    width: integer("width"),
    height: integer("height"),
    alt: text("alt").notNull().default(""),
    caption: text("caption"),
    folder: varchar("folder", { length: 160 }).notNull().default("uncategorised"),
    // Unpublished until a human reviews and categorises the asset.
    isPublished: boolean("is_published").notNull().default(false),
    uploadedBy: integer("uploaded_by").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("media_library_folder_idx").on(t.folder)],
);

/* ── editorial ───────────────────────────────────────────── */

/** Real reviews only. Seeded empty, matching the existing `verifiedReviews = []`. */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  authorName: varchar("author_name", { length: 160 }).notNull(),
  authorLocation: varchar("author_location", { length: 160 }),
  destinationLabel: varchar("destination_label", { length: 160 }),
  quote: text("quote").notNull(),
  rating: integer("rating"),
  // e.g. "Google" — matches the existing Review.source field.
  source: varchar("source", { length: 80 }).notNull().default("Google"),
  displayDate: varchar("display_date", { length: 60 }),
  sourceUrl: text("source_url"),
  isVerified: boolean("is_verified").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blogs = pgTable(
  "blogs",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 200 }).notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    // Paragraph array, preserved verbatim from content.ts `BlogPost.body`.
    body: jsonb("body").$type<string[]>().notNull().default([]),
    coverImage: text("cover_image"),
    category: varchar("category", { length: 120 }),
    readTime: varchar("read_time", { length: 60 }),
    displayDate: varchar("display_date", { length: 60 }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    isPublished: boolean("is_published").notNull().default(true),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("blogs_slug_key").on(t.slug)],
);

export const faqs = pgTable(
  "faqs",
  {
    id: serial("id").primaryKey(),
    category: varchar("category", { length: 160 }).notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
  },
  (t) => [index("faqs_category_idx").on(t.category)],
);

/* ── leads ───────────────────────────────────────────────── */

export const enquiries = pgTable(
  "enquiries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    destination: varchar("destination", { length: 200 }),
    travelDate: varchar("travel_date", { length: 60 }),
    travellers: varchar("travellers", { length: 60 }),
    holidayType: varchar("holiday_type", { length: 160 }),
    message: text("message"),
    status: enquiryStatusEnum("status").notNull().default("new"),
    adminNotes: text("admin_notes"),
    sourcePage: varchar("source_page", { length: 255 }),
    // Operational metadata — used for rate limiting and spam triage only.
    ipHash: varchar("ip_hash", { length: 128 }),
    userAgent: text("user_agent"),
    emailSent: boolean("email_sent").notNull().default(false),
    whatsappClicked: boolean("whatsapp_clicked").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("enquiries_status_idx").on(t.status),
    index("enquiries_created_idx").on(t.createdAt),
  ],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    source: varchar("source", { length: 120 }).notNull().default("footer"),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("newsletter_email_key").on(t.email)],
);

/* ── settings ────────────────────────────────────────────── */

/**
 * CMS-editable key/value settings, including the four homepage stats.
 * "50k+ Happy Travellers" is UNVERIFIED and stored here so the owner can
 * correct or remove it without a code change.
 */
export const siteSettings = pgTable(
  "site_settings",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 160 }).notNull(),
    value: text("value").notNull(),
    label: varchar("label", { length: 200 }),
    group: varchar("group", { length: 120 }).notNull().default("general"),
    notes: text("notes"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("site_settings_key_key").on(t.key)],
);

/* ── inferred types ──────────────────────────────────────── */

export type Destination = typeof destinations.$inferSelect;
export type NewDestination = typeof destinations.$inferInsert;
export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type MediaAsset = typeof mediaLibrary.$inferSelect;
export type GuestPhoto = typeof guestGallery.$inferSelect;
