import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_hero_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_pages_blocks_cta_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_services_key" ADD VALUE 'general';
  ALTER TYPE "public"."enum_header_nav_items_children_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_header_nav_items_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_header_cta_preset_service" ADD VALUE 'general';
  ALTER TYPE "public"."enum_footer_columns_links_preset_service" ADD VALUE 'general';
  ALTER TABLE "services_form_follow_up_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_form_follow_up_options_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_form_follow_up_options" CASCADE;
  DROP TABLE "services_form_follow_up_options_locales" CASCADE;
  ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "consent_text" SET DEFAULT 'I accept the processing of my personal data for the purpose of reviewing and responding to my request, in accordance with the Privacy Policy of PEREGRINE Consultancy.';
  ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "success_message" SET DEFAULT 'Our team will contact you as soon as possible to discuss your request and the next steps.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "consent_text" SET DEFAULT 'I accept the processing of my personal data for the purpose of reviewing and responding to my request, in accordance with the Privacy Policy of PEREGRINE Consultancy.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "success_message" SET DEFAULT 'Our team will contact you as soon as possible to discuss your request and the next steps.';
  ALTER TABLE "enquiries" ADD COLUMN "gender" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "role" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "participant_name" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "participant_age" varchar;
  ALTER TABLE "services" DROP COLUMN "form_follow_up_type";
  ALTER TABLE "services" DROP COLUMN "destination_field";
  ALTER TABLE "services_locales" DROP COLUMN "form_follow_up_label";
  ALTER TABLE "services_locales" DROP COLUMN "form_follow_up_placeholder";
  DROP TYPE "public"."enum_services_form_follow_up_type";
  DROP TYPE "public"."enum_services_destination_field";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_form_follow_up_type" AS ENUM('select', 'text');
  CREATE TYPE "public"."enum_services_destination_field" AS ENUM('multi', 'single', 'none');
  CREATE TABLE "services_form_follow_up_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_form_follow_up_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_hero_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_hero_buttons_preset_service";
  ALTER TABLE "pages_blocks_split_content_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_split_content_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_split_content_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_split_content_buttons_preset_service";
  ALTER TABLE "pages_blocks_service_cards_cards" ALTER COLUMN "link_preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_service_cards_cards" ALTER COLUMN "link_preset_service" SET DATA TYPE "public"."enum_pages_blocks_service_cards_cards_link_preset_service" USING "link_preset_service"::"public"."enum_pages_blocks_service_cards_cards_link_preset_service";
  ALTER TABLE "pages_blocks_card_grid_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_card_grid_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_card_grid_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_card_grid_buttons_preset_service";
  ALTER TABLE "pages_blocks_destinations_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_destinations_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_destinations_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_destinations_buttons_preset_service";
  ALTER TABLE "pages_blocks_timeline_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_timeline_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_timeline_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_timeline_buttons_preset_service";
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_preset_service";
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_pages_blocks_cta_buttons_preset_service" USING "preset_service"::"public"."enum_pages_blocks_cta_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_hero_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_hero_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_hero_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_hero_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_split_content_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_split_content_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_split_content_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_split_content_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ALTER COLUMN "link_preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ALTER COLUMN "link_preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_service_cards_cards_link_preset_service" USING "link_preset_service"::"public"."enum__pages_v_blocks_service_cards_cards_link_preset_service";
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_card_grid_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_destinations_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_destinations_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_destinations_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_destinations_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_timeline_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_timeline_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_timeline_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_timeline_buttons_preset_service";
  ALTER TABLE "_pages_v_blocks_cta_buttons" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "_pages_v_blocks_cta_buttons" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum__pages_v_blocks_cta_buttons_preset_service" USING "preset_service"::"public"."enum__pages_v_blocks_cta_buttons_preset_service";
  ALTER TABLE "services" ALTER COLUMN "key" SET DATA TYPE text;
  DROP TYPE "public"."enum_services_key";
  CREATE TYPE "public"."enum_services_key" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "services" ALTER COLUMN "key" SET DATA TYPE "public"."enum_services_key" USING "key"::"public"."enum_services_key";
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_children_preset_service";
  CREATE TYPE "public"."enum_header_nav_items_children_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_header_nav_items_children_preset_service" USING "preset_service"::"public"."enum_header_nav_items_children_preset_service";
  ALTER TABLE "header_nav_items" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_preset_service";
  CREATE TYPE "public"."enum_header_nav_items_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "header_nav_items" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_header_nav_items_preset_service" USING "preset_service"::"public"."enum_header_nav_items_preset_service";
  ALTER TABLE "header" ALTER COLUMN "cta_preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_cta_preset_service";
  CREATE TYPE "public"."enum_header_cta_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "header" ALTER COLUMN "cta_preset_service" SET DATA TYPE "public"."enum_header_cta_preset_service" USING "cta_preset_service"::"public"."enum_header_cta_preset_service";
  ALTER TABLE "footer_columns_links" ALTER COLUMN "preset_service" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_columns_links_preset_service";
  CREATE TYPE "public"."enum_footer_columns_links_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  ALTER TABLE "footer_columns_links" ALTER COLUMN "preset_service" SET DATA TYPE "public"."enum_footer_columns_links_preset_service" USING "preset_service"::"public"."enum_footer_columns_links_preset_service";
  ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "consent_text" SET DEFAULT 'I agree that PEREGRINE may use my details to respond to this enquiry, as described in the Privacy Policy.';
  ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "success_message" SET DEFAULT 'Our team will contact you to arrange your consultation.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "consent_text" SET DEFAULT 'I agree that PEREGRINE may use my details to respond to this enquiry, as described in the Privacy Policy.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "success_message" SET DEFAULT 'Our team will contact you to arrange your consultation.';
  ALTER TABLE "services" ADD COLUMN "form_follow_up_type" "enum_services_form_follow_up_type" DEFAULT 'select';
  ALTER TABLE "services" ADD COLUMN "destination_field" "enum_services_destination_field" DEFAULT 'multi';
  ALTER TABLE "services_locales" ADD COLUMN "form_follow_up_label" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "form_follow_up_placeholder" varchar;
  ALTER TABLE "services_form_follow_up_options" ADD CONSTRAINT "services_form_follow_up_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_form_follow_up_options_locales" ADD CONSTRAINT "services_form_follow_up_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_form_follow_up_options"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_form_follow_up_options_order_idx" ON "services_form_follow_up_options" USING btree ("_order");
  CREATE INDEX "services_form_follow_up_options_parent_id_idx" ON "services_form_follow_up_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_form_follow_up_options_locales_locale_parent_id_uni" ON "services_form_follow_up_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_form_follow_up_options_locales_parent_id_idx" ON "services_form_follow_up_options_locales" USING btree ("_parent_id");
  ALTER TABLE "enquiries" DROP COLUMN "gender";
  ALTER TABLE "enquiries" DROP COLUMN "role";
  ALTER TABLE "enquiries" DROP COLUMN "participant_name";
  ALTER TABLE "enquiries" DROP COLUMN "participant_age";`)
}
