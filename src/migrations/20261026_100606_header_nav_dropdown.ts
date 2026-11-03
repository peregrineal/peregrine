import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_children_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_nav_items_children_preset_service" AS ENUM('higher-education', 'language-courses', 'boarding', 'camps', 'student-visa', 'tourist-visa');
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_children_type" DEFAULT 'internal',
  	"page_id" integer,
  	"anchor" varchar,
  	"url" varchar,
  	"preset_service" "enum_header_nav_items_children_preset_service"
  );
  
  CREATE TABLE "header_nav_items_children_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children_locales" ADD CONSTRAINT "header_nav_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_page_idx" ON "header_nav_items_children" USING btree ("page_id");
  CREATE UNIQUE INDEX "header_nav_items_children_locales_locale_parent_id_unique" ON "header_nav_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_children_locales_parent_id_idx" ON "header_nav_items_children_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items_children_locales" CASCADE;
  DROP TYPE "public"."enum_header_nav_items_children_type";
  DROP TYPE "public"."enum_header_nav_items_children_preset_service";`)
}
