CREATE TYPE "public"."admin_role" AS ENUM('owner', 'editor');--> statement-breakpoint
CREATE TYPE "public"."destination_kind" AS ENUM('international', 'domestic');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'in_progress', 'converted', 'closed');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(160) NOT NULL,
	"role" "admin_role" DEFAULT 'editor' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cover_image" text,
	"category" varchar(120),
	"read_time" varchar(60),
	"display_date" varchar(60),
	"published_at" timestamp with time zone,
	"is_published" boolean DEFAULT true NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destination_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"destination_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"caption" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destinations" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"name" varchar(160) NOT NULL,
	"country" varchar(160) NOT NULL,
	"region" varchar(160) NOT NULL,
	"kind" "destination_kind" NOT NULL,
	"is_prime" boolean DEFAULT false NOT NULL,
	"ribbon" varchar(120),
	"tagline" text NOT NULL,
	"overview" text NOT NULL,
	"hero_image" text,
	"best_time" varchar(240),
	"best_time_note" text,
	"visa" text,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"why_visit" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ideal_for" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"attractions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"experiences" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"hotels" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"related" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"faqs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"destination" varchar(200),
	"travel_date" varchar(60),
	"travellers" varchar(60),
	"holiday_type" varchar(160),
	"message" text,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"admin_notes" text,
	"source_page" varchar(255),
	"ip_hash" varchar(128),
	"user_agent" text,
	"email_sent" boolean DEFAULT false NOT NULL,
	"whatsapp_clicked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(160) NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"label" varchar(160) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guest_gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"thumbnail_url" text,
	"alt" text DEFAULT '' NOT NULL,
	"caption" text,
	"guest_name" varchar(160),
	"destination_id" integer,
	"destination_label" varchar(160),
	"category_id" integer,
	"travel_date" varchar(60),
	"trip_type" varchar(120),
	"story" text,
	"testimonial" text,
	"consent_given" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"width" integer,
	"height" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "holiday_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"name" varchar(200) NOT NULL,
	"blurb" text NOT NULL,
	"intro" text DEFAULT '' NOT NULL,
	"image" text,
	"icon" varchar(80),
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"suited" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_library" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"public_id" text,
	"filename" varchar(255) NOT NULL,
	"mime_type" varchar(120),
	"bytes" integer,
	"width" integer,
	"height" integer,
	"alt" text DEFAULT '' NOT NULL,
	"caption" text,
	"folder" varchar(160) DEFAULT 'uncategorised' NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"uploaded_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"source" varchar(120) DEFAULT 'footer' NOT NULL,
	"unsubscribed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"title" varchar(200) NOT NULL,
	"kicker" varchar(200),
	"intro" text NOT NULL,
	"hero" text,
	"sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"faqs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(160) NOT NULL,
	"value" text NOT NULL,
	"label" varchar(200),
	"group" varchar(120) DEFAULT 'general' NOT NULL,
	"notes" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_name" varchar(160) NOT NULL,
	"author_location" varchar(160),
	"destination_label" varchar(160),
	"quote" text NOT NULL,
	"rating" integer,
	"source" varchar(80) DEFAULT 'Google' NOT NULL,
	"display_date" varchar(60),
	"source_url" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "destination_images" ADD CONSTRAINT "destination_images_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_gallery" ADD CONSTRAINT "guest_gallery_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_gallery" ADD CONSTRAINT "guest_gallery_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_library" ADD CONSTRAINT "media_library_uploaded_by_admin_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "destination_images_dest_idx" ON "destination_images" USING btree ("destination_id");--> statement-breakpoint
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "destinations_kind_idx" ON "destinations" USING btree ("kind");--> statement-breakpoint
CREATE INDEX "destinations_prime_idx" ON "destinations" USING btree ("is_prime");--> statement-breakpoint
CREATE INDEX "enquiries_status_idx" ON "enquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "enquiries_created_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "gallery_categories_slug_key" ON "gallery_categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "guest_gallery_published_idx" ON "guest_gallery" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "guest_gallery_category_idx" ON "guest_gallery" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "holiday_types_slug_key" ON "holiday_types" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "media_library_folder_idx" ON "media_library" USING btree ("folder");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_email_key" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "services_slug_key" ON "services" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings" USING btree ("key");