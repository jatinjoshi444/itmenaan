import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiences_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_stays_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_lodge_sub_pages_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_journal_blocks_heading_block_level" AS ENUM('h2', 'h3');
  CREATE TYPE "public"."enum_the_lodge_page_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_kumaon_kitchen_page_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_stays_page_hero_mode" AS ENUM('full', 'split');
  CREATE TYPE "public"."enum_experiences_page_hero_mode" AS ENUM('full', 'split');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "experiences_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "experiences_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "experiences_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "experiences_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"path" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"show_in_sub_nav" boolean DEFAULT true,
  	"show_in_experience_index" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"card_content_title" varchar,
  	"card_content_subtitle" varchar,
  	"card_content_description" varchar,
  	"card_content_image_id" integer,
  	"card_content_button_label" varchar DEFAULT 'Explore',
  	"card_content_button_url" varchar,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_mode" "enum_experiences_hero_mode" DEFAULT 'full',
  	"hero_image_id" integer,
  	"hero_pos" varchar DEFAULT '50% 50%',
  	"cta_band_h" varchar,
  	"cta_band_p" varchar,
  	"cta_band_button_label" varchar,
  	"cta_band_button_url" varchar,
  	"sticky_cta_enabled" boolean DEFAULT false,
  	"sticky_cta_label" varchar,
  	"sticky_cta_url" varchar,
  	"seo_title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stays_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "stays_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "stays_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "stays_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "stays_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "stays" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_title" varchar,
  	"slug" varchar NOT NULL,
  	"path" varchar,
  	"show_in_sub_nav" boolean DEFAULT true,
  	"show_in_stay_index" boolean DEFAULT true,
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"card_image_id" integer,
  	"card_cta" varchar DEFAULT 'Explore',
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_mode" "enum_stays_hero_mode" DEFAULT 'split',
  	"hero_image_id" integer,
  	"cta_band_enabled" boolean DEFAULT true,
  	"cta_band_h" varchar,
  	"cta_band_p" varchar,
  	"cta_band_button_label" varchar,
  	"cta_band_button_url" varchar,
  	"sticky_cta_enabled" boolean DEFAULT false,
  	"sticky_cta_label" varchar,
  	"sticky_cta_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lodge_sub_pages_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "lodge_sub_pages_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "lodge_sub_pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "lodge_sub_pages_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "lodge_sub_pages_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "lodge_sub_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"path" varchar,
  	"show_in_sub_nav" boolean DEFAULT true,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_mode" "enum_lodge_sub_pages_hero_mode" DEFAULT 'split',
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "our_world_sub_pages_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "our_world_sub_pages_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "our_world_sub_pages_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "our_world_sub_pages_sections_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "our_world_sub_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "our_world_sub_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"show_in_sub_nav" boolean DEFAULT true,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journal_blocks_heading_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_journal_blocks_heading_block_level" DEFAULT 'h2',
  	"block_name" varchar
  );
  
  CREATE TABLE "journal_blocks_paragraph_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "journal_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "journal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" varchar,
  	"summary" varchar,
  	"image_id" integer NOT NULL,
  	"published_date" timestamp(3) with time zone,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"experiences_id" integer,
  	"stays_id" integer,
  	"lodge_sub_pages_id" integer,
  	"our_world_sub_pages_id" integer,
  	"journal_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_intro_section_feeling_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_stay_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"p" varchar,
  	"cta" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "homepage_slow_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_people_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_kitchen_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_beyond_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_journey_section_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"intro_section_eyebrow" varchar,
  	"intro_section_first_paragraph" varchar,
  	"intro_section_pull_text" varchar,
  	"intro_section_feeling_title" varchar,
  	"intro_section_feeling_image_id" integer,
  	"intro_section_cta_text" varchar,
  	"intro_section_cta_path" varchar,
  	"stay_section_eyebrow" varchar,
  	"stay_section_title" varchar,
  	"slow_section_eyebrow" varchar,
  	"slow_section_title" varchar,
  	"slow_section_image_id" integer,
  	"slow_section_quote" varchar,
  	"slow_section_cta_text" varchar,
  	"slow_section_cta_path" varchar,
  	"people_section_eyebrow" varchar,
  	"people_section_title" varchar,
  	"people_section_image_id" integer,
  	"people_section_pull_text" varchar,
  	"people_section_cta_text" varchar,
  	"people_section_cta_path" varchar,
  	"kitchen_section_eyebrow" varchar,
  	"kitchen_section_title" varchar,
  	"kitchen_section_image_id" integer,
  	"kitchen_section_lead" varchar,
  	"kitchen_section_cta_text" varchar,
  	"kitchen_section_cta_path" varchar,
  	"beyond_section_eyebrow" varchar,
  	"beyond_section_title" varchar,
  	"beyond_section_image_id" integer,
  	"beyond_section_pull_text" varchar,
  	"beyond_section_cta_text" varchar,
  	"beyond_section_cta_path" varchar,
  	"journey_section_eyebrow" varchar,
  	"journey_section_title" varchar,
  	"journey_section_pull_text" varchar,
  	"journey_section_cta_text" varchar,
  	"journey_section_cta_path" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "the_lodge_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "the_lodge_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "the_lodge_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "the_lodge_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "the_lodge_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "the_lodge_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Itmenaan Estate · The Lodge',
  	"hero_h1" varchar DEFAULT 'Where contentment comes naturally.',
  	"hero_mode" "enum_the_lodge_page_hero_mode" DEFAULT 'split',
  	"hero_image_id" integer,
  	"hero_pos" varchar DEFAULT '50% 50%',
  	"cta_band_h" varchar DEFAULT 'Perhaps what you are looking for is already here.',
  	"cta_band_p" varchar DEFAULT 'A few days in the mountains. A little distance from the familiar. Time to read, wander, reconnect, or simply be.',
  	"cta_band_button_label" varchar DEFAULT 'Book Your Stay',
  	"cta_band_button_url" varchar DEFAULT 'book',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kumaon_kitchen_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "kumaon_kitchen_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "kumaon_kitchen_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "kumaon_kitchen_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "kumaon_kitchen_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "kumaon_kitchen_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Itmenaan Estate · The Kumaon Kitchen',
  	"hero_h1" varchar DEFAULT 'Rooted in the soil, crafted with patience.',
  	"hero_mode" "enum_kumaon_kitchen_page_hero_mode" DEFAULT 'split',
  	"hero_image_id" integer,
  	"hero_pos" varchar DEFAULT '50% 50%',
  	"cta_band_h" varchar DEFAULT 'Taste the unhurried life.',
  	"cta_band_p" varchar DEFAULT 'Join us for meals cooked with love, tradition, and local ingredients.',
  	"cta_band_button_label" varchar DEFAULT 'Reserve Your Table',
  	"cta_band_button_url" varchar DEFAULT 'book',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stays_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "stays_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "stays_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "stays_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "stays_page_table_section_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "stays_page_table_section_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "stays_page_table_section_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "stays_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "stays_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar DEFAULT 'Cottages & Rooms in Kumaon | Itmenaan Estate',
  	"hero_eyebrow" varchar DEFAULT 'YOUR STAY AT ITMENAAN',
  	"hero_h1" varchar DEFAULT 'Rooms with a view of another life.',
  	"hero_mode" "enum_stays_page_hero_mode" DEFAULT 'split',
  	"hero_image_id" integer,
  	"hero_pos" varchar DEFAULT '50% 50%',
  	"cta_band_enabled" boolean DEFAULT true,
  	"cta_band_h" varchar DEFAULT 'Whichever room you choose, the mountains are never far away.',
  	"cta_band_p" varchar DEFAULT 'Choose from our carefully curated cottages and rooms.',
  	"cta_band_button_label" varchar DEFAULT 'CHECK AVAILABILITY',
  	"cta_band_button_url" varchar DEFAULT 'book',
  	"table_section_enabled" boolean DEFAULT true,
  	"table_section_eyebrow" varchar DEFAULT 'Eight keys, four ways to stay',
  	"table_section_title" varchar DEFAULT 'At a glance.',
  	"sticky_cta_enabled" boolean DEFAULT true,
  	"sticky_cta_label" varchar DEFAULT 'Check Availability',
  	"sticky_cta_url" varchar DEFAULT 'book',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "experiences_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "experiences_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "experiences_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_mode" "enum_experiences_page_hero_mode" DEFAULT 'full',
  	"hero_image_id" integer,
  	"hero_pos" varchar DEFAULT '50% 50%',
  	"cta_band_h" varchar,
  	"cta_band_p" varchar,
  	"cta_band_button_label" varchar,
  	"cta_band_button_url" varchar,
  	"sticky_cta_enabled" boolean DEFAULT false,
  	"sticky_cta_label" varchar,
  	"sticky_cta_url" varchar,
  	"seo_title" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "our_world_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "our_world_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "our_world_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "our_world_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "our_world_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "our_world_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journeys_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "journeys_page_journeys_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "journeys_page_journeys" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"lead" varchar,
  	"image_id" integer NOT NULL,
  	"button_label" varchar DEFAULT 'Enquire',
  	"button_url" varchar DEFAULT 'enquire'
  );
  
  CREATE TABLE "journeys_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "journeys_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "journeys_page_cta_band_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "journeys_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_image_id" integer,
  	"cta_band_h" varchar,
  	"cta_band_p" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journal_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "journal_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_image_id" integer,
  	"letter_band_heading" varchar DEFAULT 'A letter from the mountains.',
  	"letter_band_paragraph1" varchar DEFAULT 'Occasionally, we send stories, seasonal observations and invitations from Itmenaan.',
  	"letter_band_paragraph2" varchar DEFAULT 'No unnecessary noise. Just something worth reading.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_hero_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "contact_page_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "contact_page_arrival_section_arrival_cards_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "contact_page_arrival_section_arrival_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_h1" varchar,
  	"hero_image_id" integer,
  	"arrival_section_eyebrow" varchar DEFAULT 'Arrival',
  	"arrival_section_title" varchar DEFAULT 'Finding your way to Itmenaan.',
  	"arrival_section_intro" varchar DEFAULT 'Itmenaan Estate is located in the Almora district of Uttarakhand, in the Kumaon Himalayas, near Binsar.',
  	"reservations_section_eyebrow" varchar DEFAULT 'Reservations',
  	"reservations_section_title" varchar DEFAULT 'We would love to hear from you.',
  	"reservations_section_estate_name" varchar DEFAULT 'Itmenaan Estate',
  	"reservations_section_address" varchar DEFAULT 'Almora District, Kumaon Himalayas, Uttarakhand',
  	"reservations_section_phone" varchar DEFAULT '+91 ...',
  	"reservations_section_phone_href" varchar DEFAULT 'tel:+',
  	"reservations_section_email" varchar DEFAULT 'reservations@itmenaanestate.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_navigation_menu_items_subs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"to" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"n" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "header_navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'itmenaan',
  	"brand_sub" varchar DEFAULT 'estate · kumaon',
  	"book_button_text" varchar DEFAULT 'Book your stay',
  	"menu_eyebrow" varchar DEFAULT 'Explore Itmenaan',
  	"contact_link_text" varchar DEFAULT 'Contact & Arrival',
  	"contact_link_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_explore_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_stay_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_reservations_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'itmenaan',
  	"brand_sub" varchar DEFAULT 'estate · kumaon',
  	"member_label" varchar DEFAULT 'A member of',
  	"member_logo_id" integer,
  	"quote_eyebrow" varchar DEFAULT 'The mountains have always known.',
  	"quote_main" varchar DEFAULT 'That life need not be hurried to be full. That silence need not be empty.',
  	"quote_sub" varchar DEFAULT 'That happiness is sometimes nothing more than a beautiful place, good company and the pleasure of wanting nothing else.',
  	"quote_sign" varchar DEFAULT 'Itmenaan. You have arrived.',
  	"explore_title" varchar DEFAULT 'Explore',
  	"stay_title" varchar DEFAULT 'Stay',
  	"reservations_title" varchar DEFAULT 'Reservations',
  	"newsletter_title" varchar DEFAULT 'Letters from Itmenaan',
  	"newsletter_desc" varchar DEFAULT 'Occasionally, we send stories, seasonal observations and invitations from Itmenaan.',
  	"address" varchar DEFAULT 'Almora District, Uttarakhand, India',
  	"copyright" varchar DEFAULT '© 2026 Itmenaan Estate',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_hero_lede" ADD CONSTRAINT "experiences_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_blocks_p" ADD CONSTRAINT "experiences_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_blocks_gallery_images" ADD CONSTRAINT "experiences_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_blocks_gallery_images" ADD CONSTRAINT "experiences_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_blocks" ADD CONSTRAINT "experiences_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_gallery" ADD CONSTRAINT "experiences_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_gallery" ADD CONSTRAINT "experiences_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_links" ADD CONSTRAINT "experiences_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_card_content_image_id_media_id_fk" FOREIGN KEY ("card_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stays_hero_lede" ADD CONSTRAINT "stays_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_blocks_p" ADD CONSTRAINT "stays_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_blocks_gallery_images" ADD CONSTRAINT "stays_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stays_blocks_gallery_images" ADD CONSTRAINT "stays_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_blocks" ADD CONSTRAINT "stays_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_links" ADD CONSTRAINT "stays_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays" ADD CONSTRAINT "stays_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stays" ADD CONSTRAINT "stays_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_hero_lede" ADD CONSTRAINT "lodge_sub_pages_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lodge_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_blocks_p" ADD CONSTRAINT "lodge_sub_pages_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lodge_sub_pages_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_blocks_gallery_images" ADD CONSTRAINT "lodge_sub_pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_blocks_gallery_images" ADD CONSTRAINT "lodge_sub_pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lodge_sub_pages_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_blocks" ADD CONSTRAINT "lodge_sub_pages_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lodge_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages_links" ADD CONSTRAINT "lodge_sub_pages_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lodge_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lodge_sub_pages" ADD CONSTRAINT "lodge_sub_pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_hero_lede" ADD CONSTRAINT "our_world_sub_pages_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_blocks_p" ADD CONSTRAINT "our_world_sub_pages_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_sub_pages_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_blocks" ADD CONSTRAINT "our_world_sub_pages_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_sections_p" ADD CONSTRAINT "our_world_sub_pages_sections_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_sub_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_sections" ADD CONSTRAINT "our_world_sub_pages_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages_sections" ADD CONSTRAINT "our_world_sub_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_sub_pages" ADD CONSTRAINT "our_world_sub_pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_blocks_heading_block" ADD CONSTRAINT "journal_blocks_heading_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_blocks_paragraph_block" ADD CONSTRAINT "journal_blocks_paragraph_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_blocks_image_block" ADD CONSTRAINT "journal_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_blocks_image_block" ADD CONSTRAINT "journal_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal" ADD CONSTRAINT "journal_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal" ADD CONSTRAINT "journal_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stays_fk" FOREIGN KEY ("stays_id") REFERENCES "public"."stays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lodge_sub_pages_fk" FOREIGN KEY ("lodge_sub_pages_id") REFERENCES "public"."lodge_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_our_world_sub_pages_fk" FOREIGN KEY ("our_world_sub_pages_id") REFERENCES "public"."our_world_sub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_intro_section_feeling_paragraphs" ADD CONSTRAINT "homepage_intro_section_feeling_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_stay_panels" ADD CONSTRAINT "homepage_stay_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_stay_panels" ADD CONSTRAINT "homepage_stay_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_slow_section_paragraphs" ADD CONSTRAINT "homepage_slow_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_people_section_paragraphs" ADD CONSTRAINT "homepage_people_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_kitchen_section_paragraphs" ADD CONSTRAINT "homepage_kitchen_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_beyond_section_paragraphs" ADD CONSTRAINT "homepage_beyond_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_journey_section_paragraphs" ADD CONSTRAINT "homepage_journey_section_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_intro_section_feeling_image_id_media_id_fk" FOREIGN KEY ("intro_section_feeling_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_slow_section_image_id_media_id_fk" FOREIGN KEY ("slow_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_people_section_image_id_media_id_fk" FOREIGN KEY ("people_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_kitchen_section_image_id_media_id_fk" FOREIGN KEY ("kitchen_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_beyond_section_image_id_media_id_fk" FOREIGN KEY ("beyond_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "the_lodge_page_hero_lede" ADD CONSTRAINT "the_lodge_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."the_lodge_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "the_lodge_page_blocks_p" ADD CONSTRAINT "the_lodge_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."the_lodge_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "the_lodge_page_blocks_gallery_images" ADD CONSTRAINT "the_lodge_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "the_lodge_page_blocks_gallery_images" ADD CONSTRAINT "the_lodge_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."the_lodge_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "the_lodge_page_blocks" ADD CONSTRAINT "the_lodge_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."the_lodge_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "the_lodge_page_links" ADD CONSTRAINT "the_lodge_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."the_lodge_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "the_lodge_page" ADD CONSTRAINT "the_lodge_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_hero_lede" ADD CONSTRAINT "kumaon_kitchen_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kumaon_kitchen_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_blocks_p" ADD CONSTRAINT "kumaon_kitchen_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kumaon_kitchen_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_blocks_gallery_images" ADD CONSTRAINT "kumaon_kitchen_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_blocks_gallery_images" ADD CONSTRAINT "kumaon_kitchen_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kumaon_kitchen_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_blocks" ADD CONSTRAINT "kumaon_kitchen_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kumaon_kitchen_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page_links" ADD CONSTRAINT "kumaon_kitchen_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kumaon_kitchen_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kumaon_kitchen_page" ADD CONSTRAINT "kumaon_kitchen_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stays_page_hero_lede" ADD CONSTRAINT "stays_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_blocks_p" ADD CONSTRAINT "stays_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_blocks_gallery_images" ADD CONSTRAINT "stays_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stays_page_blocks_gallery_images" ADD CONSTRAINT "stays_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_blocks" ADD CONSTRAINT "stays_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_table_section_columns" ADD CONSTRAINT "stays_page_table_section_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_table_section_rows_values" ADD CONSTRAINT "stays_page_table_section_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page_table_section_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_table_section_rows" ADD CONSTRAINT "stays_page_table_section_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page_links" ADD CONSTRAINT "stays_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stays_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stays_page" ADD CONSTRAINT "stays_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_page_hero_lede" ADD CONSTRAINT "experiences_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page_blocks_p" ADD CONSTRAINT "experiences_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page_blocks_gallery_images" ADD CONSTRAINT "experiences_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_page_blocks_gallery_images" ADD CONSTRAINT "experiences_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page_blocks" ADD CONSTRAINT "experiences_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page" ADD CONSTRAINT "experiences_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_world_page_hero_lede" ADD CONSTRAINT "our_world_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_page_blocks_p" ADD CONSTRAINT "our_world_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_page_blocks_gallery_images" ADD CONSTRAINT "our_world_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_world_page_blocks_gallery_images" ADD CONSTRAINT "our_world_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_page_blocks" ADD CONSTRAINT "our_world_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_page_links" ADD CONSTRAINT "our_world_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_world_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_world_page" ADD CONSTRAINT "our_world_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_page_hero_lede" ADD CONSTRAINT "journeys_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page_journeys_description" ADD CONSTRAINT "journeys_page_journeys_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page_journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page_journeys" ADD CONSTRAINT "journeys_page_journeys_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_page_journeys" ADD CONSTRAINT "journeys_page_journeys_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page_blocks_p" ADD CONSTRAINT "journeys_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page_blocks" ADD CONSTRAINT "journeys_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page_cta_band_actions" ADD CONSTRAINT "journeys_page_cta_band_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_page" ADD CONSTRAINT "journeys_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_page_hero_lede" ADD CONSTRAINT "journal_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_page" ADD CONSTRAINT "journal_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_hero_lede" ADD CONSTRAINT "contact_page_hero_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_p" ADD CONSTRAINT "contact_page_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_gallery_images" ADD CONSTRAINT "contact_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_gallery_images" ADD CONSTRAINT "contact_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks" ADD CONSTRAINT "contact_page_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_arrival_section_arrival_cards_lines" ADD CONSTRAINT "contact_page_arrival_section_arrival_cards_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_arrival_section_arrival_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_arrival_section_arrival_cards" ADD CONSTRAINT "contact_page_arrival_section_arrival_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_menu_items_subs" ADD CONSTRAINT "header_navigation_menu_items_subs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_menu_items" ADD CONSTRAINT "header_navigation_menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_menu_items" ADD CONSTRAINT "header_navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_explore_links" ADD CONSTRAINT "footer_explore_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_stay_links" ADD CONSTRAINT "footer_stay_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_reservations_links" ADD CONSTRAINT "footer_reservations_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_member_logo_id_media_id_fk" FOREIGN KEY ("member_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "experiences_hero_lede_order_idx" ON "experiences_hero_lede" USING btree ("_order");
  CREATE INDEX "experiences_hero_lede_parent_id_idx" ON "experiences_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "experiences_blocks_p_order_idx" ON "experiences_blocks_p" USING btree ("_order");
  CREATE INDEX "experiences_blocks_p_parent_id_idx" ON "experiences_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "experiences_blocks_gallery_images_order_idx" ON "experiences_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "experiences_blocks_gallery_images_parent_id_idx" ON "experiences_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "experiences_blocks_gallery_images_image_idx" ON "experiences_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "experiences_blocks_order_idx" ON "experiences_blocks" USING btree ("_order");
  CREATE INDEX "experiences_blocks_parent_id_idx" ON "experiences_blocks" USING btree ("_parent_id");
  CREATE INDEX "experiences_gallery_order_idx" ON "experiences_gallery" USING btree ("_order");
  CREATE INDEX "experiences_gallery_parent_id_idx" ON "experiences_gallery" USING btree ("_parent_id");
  CREATE INDEX "experiences_gallery_image_idx" ON "experiences_gallery" USING btree ("image_id");
  CREATE INDEX "experiences_links_order_idx" ON "experiences_links" USING btree ("_order");
  CREATE INDEX "experiences_links_parent_id_idx" ON "experiences_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_slug_idx" ON "experiences" USING btree ("slug");
  CREATE INDEX "experiences_image_idx" ON "experiences" USING btree ("image_id");
  CREATE INDEX "experiences_card_content_card_content_image_idx" ON "experiences" USING btree ("card_content_image_id");
  CREATE INDEX "experiences_hero_hero_image_idx" ON "experiences" USING btree ("hero_image_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "stays_hero_lede_order_idx" ON "stays_hero_lede" USING btree ("_order");
  CREATE INDEX "stays_hero_lede_parent_id_idx" ON "stays_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "stays_blocks_p_order_idx" ON "stays_blocks_p" USING btree ("_order");
  CREATE INDEX "stays_blocks_p_parent_id_idx" ON "stays_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "stays_blocks_gallery_images_order_idx" ON "stays_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "stays_blocks_gallery_images_parent_id_idx" ON "stays_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "stays_blocks_gallery_images_image_idx" ON "stays_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "stays_blocks_order_idx" ON "stays_blocks" USING btree ("_order");
  CREATE INDEX "stays_blocks_parent_id_idx" ON "stays_blocks" USING btree ("_parent_id");
  CREATE INDEX "stays_links_order_idx" ON "stays_links" USING btree ("_order");
  CREATE INDEX "stays_links_parent_id_idx" ON "stays_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stays_slug_idx" ON "stays" USING btree ("slug");
  CREATE INDEX "stays_card_image_idx" ON "stays" USING btree ("card_image_id");
  CREATE INDEX "stays_hero_hero_image_idx" ON "stays" USING btree ("hero_image_id");
  CREATE INDEX "stays_updated_at_idx" ON "stays" USING btree ("updated_at");
  CREATE INDEX "stays_created_at_idx" ON "stays" USING btree ("created_at");
  CREATE INDEX "lodge_sub_pages_hero_lede_order_idx" ON "lodge_sub_pages_hero_lede" USING btree ("_order");
  CREATE INDEX "lodge_sub_pages_hero_lede_parent_id_idx" ON "lodge_sub_pages_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "lodge_sub_pages_blocks_p_order_idx" ON "lodge_sub_pages_blocks_p" USING btree ("_order");
  CREATE INDEX "lodge_sub_pages_blocks_p_parent_id_idx" ON "lodge_sub_pages_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "lodge_sub_pages_blocks_gallery_images_order_idx" ON "lodge_sub_pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "lodge_sub_pages_blocks_gallery_images_parent_id_idx" ON "lodge_sub_pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "lodge_sub_pages_blocks_gallery_images_image_idx" ON "lodge_sub_pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "lodge_sub_pages_blocks_order_idx" ON "lodge_sub_pages_blocks" USING btree ("_order");
  CREATE INDEX "lodge_sub_pages_blocks_parent_id_idx" ON "lodge_sub_pages_blocks" USING btree ("_parent_id");
  CREATE INDEX "lodge_sub_pages_links_order_idx" ON "lodge_sub_pages_links" USING btree ("_order");
  CREATE INDEX "lodge_sub_pages_links_parent_id_idx" ON "lodge_sub_pages_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "lodge_sub_pages_slug_idx" ON "lodge_sub_pages" USING btree ("slug");
  CREATE INDEX "lodge_sub_pages_hero_hero_image_idx" ON "lodge_sub_pages" USING btree ("hero_image_id");
  CREATE INDEX "lodge_sub_pages_updated_at_idx" ON "lodge_sub_pages" USING btree ("updated_at");
  CREATE INDEX "lodge_sub_pages_created_at_idx" ON "lodge_sub_pages" USING btree ("created_at");
  CREATE INDEX "our_world_sub_pages_hero_lede_order_idx" ON "our_world_sub_pages_hero_lede" USING btree ("_order");
  CREATE INDEX "our_world_sub_pages_hero_lede_parent_id_idx" ON "our_world_sub_pages_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "our_world_sub_pages_blocks_p_order_idx" ON "our_world_sub_pages_blocks_p" USING btree ("_order");
  CREATE INDEX "our_world_sub_pages_blocks_p_parent_id_idx" ON "our_world_sub_pages_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "our_world_sub_pages_blocks_order_idx" ON "our_world_sub_pages_blocks" USING btree ("_order");
  CREATE INDEX "our_world_sub_pages_blocks_parent_id_idx" ON "our_world_sub_pages_blocks" USING btree ("_parent_id");
  CREATE INDEX "our_world_sub_pages_sections_p_order_idx" ON "our_world_sub_pages_sections_p" USING btree ("_order");
  CREATE INDEX "our_world_sub_pages_sections_p_parent_id_idx" ON "our_world_sub_pages_sections_p" USING btree ("_parent_id");
  CREATE INDEX "our_world_sub_pages_sections_order_idx" ON "our_world_sub_pages_sections" USING btree ("_order");
  CREATE INDEX "our_world_sub_pages_sections_parent_id_idx" ON "our_world_sub_pages_sections" USING btree ("_parent_id");
  CREATE INDEX "our_world_sub_pages_sections_image_idx" ON "our_world_sub_pages_sections" USING btree ("image_id");
  CREATE INDEX "our_world_sub_pages_hero_hero_image_idx" ON "our_world_sub_pages" USING btree ("hero_image_id");
  CREATE INDEX "our_world_sub_pages_updated_at_idx" ON "our_world_sub_pages" USING btree ("updated_at");
  CREATE INDEX "our_world_sub_pages_created_at_idx" ON "our_world_sub_pages" USING btree ("created_at");
  CREATE INDEX "journal_blocks_heading_block_order_idx" ON "journal_blocks_heading_block" USING btree ("_order");
  CREATE INDEX "journal_blocks_heading_block_parent_id_idx" ON "journal_blocks_heading_block" USING btree ("_parent_id");
  CREATE INDEX "journal_blocks_heading_block_path_idx" ON "journal_blocks_heading_block" USING btree ("_path");
  CREATE INDEX "journal_blocks_paragraph_block_order_idx" ON "journal_blocks_paragraph_block" USING btree ("_order");
  CREATE INDEX "journal_blocks_paragraph_block_parent_id_idx" ON "journal_blocks_paragraph_block" USING btree ("_parent_id");
  CREATE INDEX "journal_blocks_paragraph_block_path_idx" ON "journal_blocks_paragraph_block" USING btree ("_path");
  CREATE INDEX "journal_blocks_image_block_order_idx" ON "journal_blocks_image_block" USING btree ("_order");
  CREATE INDEX "journal_blocks_image_block_parent_id_idx" ON "journal_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "journal_blocks_image_block_path_idx" ON "journal_blocks_image_block" USING btree ("_path");
  CREATE INDEX "journal_blocks_image_block_image_idx" ON "journal_blocks_image_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "journal_slug_idx" ON "journal" USING btree ("slug");
  CREATE INDEX "journal_image_idx" ON "journal" USING btree ("image_id");
  CREATE INDEX "journal_hero_hero_image_idx" ON "journal" USING btree ("hero_image_id");
  CREATE INDEX "journal_updated_at_idx" ON "journal" USING btree ("updated_at");
  CREATE INDEX "journal_created_at_idx" ON "journal" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_stays_id_idx" ON "payload_locked_documents_rels" USING btree ("stays_id");
  CREATE INDEX "payload_locked_documents_rels_lodge_sub_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("lodge_sub_pages_id");
  CREATE INDEX "payload_locked_documents_rels_our_world_sub_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("our_world_sub_pages_id");
  CREATE INDEX "payload_locked_documents_rels_journal_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_intro_section_feeling_paragraphs_order_idx" ON "homepage_intro_section_feeling_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_intro_section_feeling_paragraphs_parent_id_idx" ON "homepage_intro_section_feeling_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_stay_panels_order_idx" ON "homepage_stay_panels" USING btree ("_order");
  CREATE INDEX "homepage_stay_panels_parent_id_idx" ON "homepage_stay_panels" USING btree ("_parent_id");
  CREATE INDEX "homepage_stay_panels_image_idx" ON "homepage_stay_panels" USING btree ("image_id");
  CREATE INDEX "homepage_slow_section_paragraphs_order_idx" ON "homepage_slow_section_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_slow_section_paragraphs_parent_id_idx" ON "homepage_slow_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_people_section_paragraphs_order_idx" ON "homepage_people_section_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_people_section_paragraphs_parent_id_idx" ON "homepage_people_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_kitchen_section_paragraphs_order_idx" ON "homepage_kitchen_section_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_kitchen_section_paragraphs_parent_id_idx" ON "homepage_kitchen_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_beyond_section_paragraphs_order_idx" ON "homepage_beyond_section_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_beyond_section_paragraphs_parent_id_idx" ON "homepage_beyond_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_journey_section_paragraphs_order_idx" ON "homepage_journey_section_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_journey_section_paragraphs_parent_id_idx" ON "homepage_journey_section_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_intro_section_intro_section_feeling_image_idx" ON "homepage" USING btree ("intro_section_feeling_image_id");
  CREATE INDEX "homepage_slow_section_slow_section_image_idx" ON "homepage" USING btree ("slow_section_image_id");
  CREATE INDEX "homepage_people_section_people_section_image_idx" ON "homepage" USING btree ("people_section_image_id");
  CREATE INDEX "homepage_kitchen_section_kitchen_section_image_idx" ON "homepage" USING btree ("kitchen_section_image_id");
  CREATE INDEX "homepage_beyond_section_beyond_section_image_idx" ON "homepage" USING btree ("beyond_section_image_id");
  CREATE INDEX "the_lodge_page_hero_lede_order_idx" ON "the_lodge_page_hero_lede" USING btree ("_order");
  CREATE INDEX "the_lodge_page_hero_lede_parent_id_idx" ON "the_lodge_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "the_lodge_page_blocks_p_order_idx" ON "the_lodge_page_blocks_p" USING btree ("_order");
  CREATE INDEX "the_lodge_page_blocks_p_parent_id_idx" ON "the_lodge_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "the_lodge_page_blocks_gallery_images_order_idx" ON "the_lodge_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "the_lodge_page_blocks_gallery_images_parent_id_idx" ON "the_lodge_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "the_lodge_page_blocks_gallery_images_image_idx" ON "the_lodge_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "the_lodge_page_blocks_order_idx" ON "the_lodge_page_blocks" USING btree ("_order");
  CREATE INDEX "the_lodge_page_blocks_parent_id_idx" ON "the_lodge_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "the_lodge_page_links_order_idx" ON "the_lodge_page_links" USING btree ("_order");
  CREATE INDEX "the_lodge_page_links_parent_id_idx" ON "the_lodge_page_links" USING btree ("_parent_id");
  CREATE INDEX "the_lodge_page_hero_hero_image_idx" ON "the_lodge_page" USING btree ("hero_image_id");
  CREATE INDEX "kumaon_kitchen_page_hero_lede_order_idx" ON "kumaon_kitchen_page_hero_lede" USING btree ("_order");
  CREATE INDEX "kumaon_kitchen_page_hero_lede_parent_id_idx" ON "kumaon_kitchen_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "kumaon_kitchen_page_blocks_p_order_idx" ON "kumaon_kitchen_page_blocks_p" USING btree ("_order");
  CREATE INDEX "kumaon_kitchen_page_blocks_p_parent_id_idx" ON "kumaon_kitchen_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "kumaon_kitchen_page_blocks_gallery_images_order_idx" ON "kumaon_kitchen_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "kumaon_kitchen_page_blocks_gallery_images_parent_id_idx" ON "kumaon_kitchen_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "kumaon_kitchen_page_blocks_gallery_images_image_idx" ON "kumaon_kitchen_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "kumaon_kitchen_page_blocks_order_idx" ON "kumaon_kitchen_page_blocks" USING btree ("_order");
  CREATE INDEX "kumaon_kitchen_page_blocks_parent_id_idx" ON "kumaon_kitchen_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "kumaon_kitchen_page_links_order_idx" ON "kumaon_kitchen_page_links" USING btree ("_order");
  CREATE INDEX "kumaon_kitchen_page_links_parent_id_idx" ON "kumaon_kitchen_page_links" USING btree ("_parent_id");
  CREATE INDEX "kumaon_kitchen_page_hero_hero_image_idx" ON "kumaon_kitchen_page" USING btree ("hero_image_id");
  CREATE INDEX "stays_page_hero_lede_order_idx" ON "stays_page_hero_lede" USING btree ("_order");
  CREATE INDEX "stays_page_hero_lede_parent_id_idx" ON "stays_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "stays_page_blocks_p_order_idx" ON "stays_page_blocks_p" USING btree ("_order");
  CREATE INDEX "stays_page_blocks_p_parent_id_idx" ON "stays_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "stays_page_blocks_gallery_images_order_idx" ON "stays_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "stays_page_blocks_gallery_images_parent_id_idx" ON "stays_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "stays_page_blocks_gallery_images_image_idx" ON "stays_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "stays_page_blocks_order_idx" ON "stays_page_blocks" USING btree ("_order");
  CREATE INDEX "stays_page_blocks_parent_id_idx" ON "stays_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "stays_page_table_section_columns_order_idx" ON "stays_page_table_section_columns" USING btree ("_order");
  CREATE INDEX "stays_page_table_section_columns_parent_id_idx" ON "stays_page_table_section_columns" USING btree ("_parent_id");
  CREATE INDEX "stays_page_table_section_rows_values_order_idx" ON "stays_page_table_section_rows_values" USING btree ("_order");
  CREATE INDEX "stays_page_table_section_rows_values_parent_id_idx" ON "stays_page_table_section_rows_values" USING btree ("_parent_id");
  CREATE INDEX "stays_page_table_section_rows_order_idx" ON "stays_page_table_section_rows" USING btree ("_order");
  CREATE INDEX "stays_page_table_section_rows_parent_id_idx" ON "stays_page_table_section_rows" USING btree ("_parent_id");
  CREATE INDEX "stays_page_links_order_idx" ON "stays_page_links" USING btree ("_order");
  CREATE INDEX "stays_page_links_parent_id_idx" ON "stays_page_links" USING btree ("_parent_id");
  CREATE INDEX "stays_page_hero_hero_image_idx" ON "stays_page" USING btree ("hero_image_id");
  CREATE INDEX "experiences_page_hero_lede_order_idx" ON "experiences_page_hero_lede" USING btree ("_order");
  CREATE INDEX "experiences_page_hero_lede_parent_id_idx" ON "experiences_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_blocks_p_order_idx" ON "experiences_page_blocks_p" USING btree ("_order");
  CREATE INDEX "experiences_page_blocks_p_parent_id_idx" ON "experiences_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_blocks_gallery_images_order_idx" ON "experiences_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "experiences_page_blocks_gallery_images_parent_id_idx" ON "experiences_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_blocks_gallery_images_image_idx" ON "experiences_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "experiences_page_blocks_order_idx" ON "experiences_page_blocks" USING btree ("_order");
  CREATE INDEX "experiences_page_blocks_parent_id_idx" ON "experiences_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_hero_hero_image_idx" ON "experiences_page" USING btree ("hero_image_id");
  CREATE INDEX "our_world_page_hero_lede_order_idx" ON "our_world_page_hero_lede" USING btree ("_order");
  CREATE INDEX "our_world_page_hero_lede_parent_id_idx" ON "our_world_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "our_world_page_blocks_p_order_idx" ON "our_world_page_blocks_p" USING btree ("_order");
  CREATE INDEX "our_world_page_blocks_p_parent_id_idx" ON "our_world_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "our_world_page_blocks_gallery_images_order_idx" ON "our_world_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "our_world_page_blocks_gallery_images_parent_id_idx" ON "our_world_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "our_world_page_blocks_gallery_images_image_idx" ON "our_world_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "our_world_page_blocks_order_idx" ON "our_world_page_blocks" USING btree ("_order");
  CREATE INDEX "our_world_page_blocks_parent_id_idx" ON "our_world_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "our_world_page_links_order_idx" ON "our_world_page_links" USING btree ("_order");
  CREATE INDEX "our_world_page_links_parent_id_idx" ON "our_world_page_links" USING btree ("_parent_id");
  CREATE INDEX "our_world_page_hero_hero_image_idx" ON "our_world_page" USING btree ("hero_image_id");
  CREATE INDEX "journeys_page_hero_lede_order_idx" ON "journeys_page_hero_lede" USING btree ("_order");
  CREATE INDEX "journeys_page_hero_lede_parent_id_idx" ON "journeys_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_journeys_description_order_idx" ON "journeys_page_journeys_description" USING btree ("_order");
  CREATE INDEX "journeys_page_journeys_description_parent_id_idx" ON "journeys_page_journeys_description" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_journeys_order_idx" ON "journeys_page_journeys" USING btree ("_order");
  CREATE INDEX "journeys_page_journeys_parent_id_idx" ON "journeys_page_journeys" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_journeys_image_idx" ON "journeys_page_journeys" USING btree ("image_id");
  CREATE INDEX "journeys_page_blocks_p_order_idx" ON "journeys_page_blocks_p" USING btree ("_order");
  CREATE INDEX "journeys_page_blocks_p_parent_id_idx" ON "journeys_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_blocks_order_idx" ON "journeys_page_blocks" USING btree ("_order");
  CREATE INDEX "journeys_page_blocks_parent_id_idx" ON "journeys_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_cta_band_actions_order_idx" ON "journeys_page_cta_band_actions" USING btree ("_order");
  CREATE INDEX "journeys_page_cta_band_actions_parent_id_idx" ON "journeys_page_cta_band_actions" USING btree ("_parent_id");
  CREATE INDEX "journeys_page_hero_hero_image_idx" ON "journeys_page" USING btree ("hero_image_id");
  CREATE INDEX "journal_page_hero_lede_order_idx" ON "journal_page_hero_lede" USING btree ("_order");
  CREATE INDEX "journal_page_hero_lede_parent_id_idx" ON "journal_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "journal_page_hero_hero_image_idx" ON "journal_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_hero_lede_order_idx" ON "contact_page_hero_lede" USING btree ("_order");
  CREATE INDEX "contact_page_hero_lede_parent_id_idx" ON "contact_page_hero_lede" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_p_order_idx" ON "contact_page_blocks_p" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_p_parent_id_idx" ON "contact_page_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_gallery_images_order_idx" ON "contact_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_gallery_images_parent_id_idx" ON "contact_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_gallery_images_image_idx" ON "contact_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_order_idx" ON "contact_page_blocks" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_parent_id_idx" ON "contact_page_blocks" USING btree ("_parent_id");
  CREATE INDEX "contact_page_arrival_section_arrival_cards_lines_order_idx" ON "contact_page_arrival_section_arrival_cards_lines" USING btree ("_order");
  CREATE INDEX "contact_page_arrival_section_arrival_cards_lines_parent_id_idx" ON "contact_page_arrival_section_arrival_cards_lines" USING btree ("_parent_id");
  CREATE INDEX "contact_page_arrival_section_arrival_cards_order_idx" ON "contact_page_arrival_section_arrival_cards" USING btree ("_order");
  CREATE INDEX "contact_page_arrival_section_arrival_cards_parent_id_idx" ON "contact_page_arrival_section_arrival_cards" USING btree ("_parent_id");
  CREATE INDEX "contact_page_hero_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "header_navigation_menu_items_subs_order_idx" ON "header_navigation_menu_items_subs" USING btree ("_order");
  CREATE INDEX "header_navigation_menu_items_subs_parent_id_idx" ON "header_navigation_menu_items_subs" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_menu_items_order_idx" ON "header_navigation_menu_items" USING btree ("_order");
  CREATE INDEX "header_navigation_menu_items_parent_id_idx" ON "header_navigation_menu_items" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_menu_items_image_idx" ON "header_navigation_menu_items" USING btree ("image_id");
  CREATE INDEX "footer_explore_links_order_idx" ON "footer_explore_links" USING btree ("_order");
  CREATE INDEX "footer_explore_links_parent_id_idx" ON "footer_explore_links" USING btree ("_parent_id");
  CREATE INDEX "footer_stay_links_order_idx" ON "footer_stay_links" USING btree ("_order");
  CREATE INDEX "footer_stay_links_parent_id_idx" ON "footer_stay_links" USING btree ("_parent_id");
  CREATE INDEX "footer_reservations_links_order_idx" ON "footer_reservations_links" USING btree ("_order");
  CREATE INDEX "footer_reservations_links_parent_id_idx" ON "footer_reservations_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_member_logo_idx" ON "footer" USING btree ("member_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "experiences_hero_lede" CASCADE;
  DROP TABLE "experiences_blocks_p" CASCADE;
  DROP TABLE "experiences_blocks_gallery_images" CASCADE;
  DROP TABLE "experiences_blocks" CASCADE;
  DROP TABLE "experiences_gallery" CASCADE;
  DROP TABLE "experiences_links" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "stays_hero_lede" CASCADE;
  DROP TABLE "stays_blocks_p" CASCADE;
  DROP TABLE "stays_blocks_gallery_images" CASCADE;
  DROP TABLE "stays_blocks" CASCADE;
  DROP TABLE "stays_links" CASCADE;
  DROP TABLE "stays" CASCADE;
  DROP TABLE "lodge_sub_pages_hero_lede" CASCADE;
  DROP TABLE "lodge_sub_pages_blocks_p" CASCADE;
  DROP TABLE "lodge_sub_pages_blocks_gallery_images" CASCADE;
  DROP TABLE "lodge_sub_pages_blocks" CASCADE;
  DROP TABLE "lodge_sub_pages_links" CASCADE;
  DROP TABLE "lodge_sub_pages" CASCADE;
  DROP TABLE "our_world_sub_pages_hero_lede" CASCADE;
  DROP TABLE "our_world_sub_pages_blocks_p" CASCADE;
  DROP TABLE "our_world_sub_pages_blocks" CASCADE;
  DROP TABLE "our_world_sub_pages_sections_p" CASCADE;
  DROP TABLE "our_world_sub_pages_sections" CASCADE;
  DROP TABLE "our_world_sub_pages" CASCADE;
  DROP TABLE "journal_blocks_heading_block" CASCADE;
  DROP TABLE "journal_blocks_paragraph_block" CASCADE;
  DROP TABLE "journal_blocks_image_block" CASCADE;
  DROP TABLE "journal" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_intro_section_feeling_paragraphs" CASCADE;
  DROP TABLE "homepage_stay_panels" CASCADE;
  DROP TABLE "homepage_slow_section_paragraphs" CASCADE;
  DROP TABLE "homepage_people_section_paragraphs" CASCADE;
  DROP TABLE "homepage_kitchen_section_paragraphs" CASCADE;
  DROP TABLE "homepage_beyond_section_paragraphs" CASCADE;
  DROP TABLE "homepage_journey_section_paragraphs" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "the_lodge_page_hero_lede" CASCADE;
  DROP TABLE "the_lodge_page_blocks_p" CASCADE;
  DROP TABLE "the_lodge_page_blocks_gallery_images" CASCADE;
  DROP TABLE "the_lodge_page_blocks" CASCADE;
  DROP TABLE "the_lodge_page_links" CASCADE;
  DROP TABLE "the_lodge_page" CASCADE;
  DROP TABLE "kumaon_kitchen_page_hero_lede" CASCADE;
  DROP TABLE "kumaon_kitchen_page_blocks_p" CASCADE;
  DROP TABLE "kumaon_kitchen_page_blocks_gallery_images" CASCADE;
  DROP TABLE "kumaon_kitchen_page_blocks" CASCADE;
  DROP TABLE "kumaon_kitchen_page_links" CASCADE;
  DROP TABLE "kumaon_kitchen_page" CASCADE;
  DROP TABLE "stays_page_hero_lede" CASCADE;
  DROP TABLE "stays_page_blocks_p" CASCADE;
  DROP TABLE "stays_page_blocks_gallery_images" CASCADE;
  DROP TABLE "stays_page_blocks" CASCADE;
  DROP TABLE "stays_page_table_section_columns" CASCADE;
  DROP TABLE "stays_page_table_section_rows_values" CASCADE;
  DROP TABLE "stays_page_table_section_rows" CASCADE;
  DROP TABLE "stays_page_links" CASCADE;
  DROP TABLE "stays_page" CASCADE;
  DROP TABLE "experiences_page_hero_lede" CASCADE;
  DROP TABLE "experiences_page_blocks_p" CASCADE;
  DROP TABLE "experiences_page_blocks_gallery_images" CASCADE;
  DROP TABLE "experiences_page_blocks" CASCADE;
  DROP TABLE "experiences_page" CASCADE;
  DROP TABLE "our_world_page_hero_lede" CASCADE;
  DROP TABLE "our_world_page_blocks_p" CASCADE;
  DROP TABLE "our_world_page_blocks_gallery_images" CASCADE;
  DROP TABLE "our_world_page_blocks" CASCADE;
  DROP TABLE "our_world_page_links" CASCADE;
  DROP TABLE "our_world_page" CASCADE;
  DROP TABLE "journeys_page_hero_lede" CASCADE;
  DROP TABLE "journeys_page_journeys_description" CASCADE;
  DROP TABLE "journeys_page_journeys" CASCADE;
  DROP TABLE "journeys_page_blocks_p" CASCADE;
  DROP TABLE "journeys_page_blocks" CASCADE;
  DROP TABLE "journeys_page_cta_band_actions" CASCADE;
  DROP TABLE "journeys_page" CASCADE;
  DROP TABLE "journal_page_hero_lede" CASCADE;
  DROP TABLE "journal_page" CASCADE;
  DROP TABLE "contact_page_hero_lede" CASCADE;
  DROP TABLE "contact_page_blocks_p" CASCADE;
  DROP TABLE "contact_page_blocks_gallery_images" CASCADE;
  DROP TABLE "contact_page_blocks" CASCADE;
  DROP TABLE "contact_page_arrival_section_arrival_cards_lines" CASCADE;
  DROP TABLE "contact_page_arrival_section_arrival_cards" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "header_navigation_menu_items_subs" CASCADE;
  DROP TABLE "header_navigation_menu_items" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "footer_explore_links" CASCADE;
  DROP TABLE "footer_stay_links" CASCADE;
  DROP TABLE "footer_reservations_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_experiences_hero_mode";
  DROP TYPE "public"."enum_stays_hero_mode";
  DROP TYPE "public"."enum_lodge_sub_pages_hero_mode";
  DROP TYPE "public"."enum_journal_blocks_heading_block_level";
  DROP TYPE "public"."enum_the_lodge_page_hero_mode";
  DROP TYPE "public"."enum_kumaon_kitchen_page_hero_mode";
  DROP TYPE "public"."enum_stays_page_hero_mode";
  DROP TYPE "public"."enum_experiences_page_hero_mode";`)
}
