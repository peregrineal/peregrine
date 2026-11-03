import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_card_grid_style" ADD VALUE 'photo';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_style" ADD VALUE 'photo';
  ALTER TABLE "pages_blocks_card_grid_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_card_grid_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_card_grid_items" ADD CONSTRAINT "pages_blocks_card_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_items" ADD CONSTRAINT "_pages_v_blocks_card_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_card_grid_items_image_idx" ON "pages_blocks_card_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_items_image_idx" ON "_pages_v_blocks_card_grid_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid_items" DROP CONSTRAINT "pages_blocks_card_grid_items_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_card_grid_items" DROP CONSTRAINT "_pages_v_blocks_card_grid_items_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "style" SET DEFAULT 'card'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_style";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_style" AS ENUM('card', 'line', 'compact');
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "style" SET DEFAULT 'card'::"public"."enum_pages_blocks_card_grid_style";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_card_grid_style" USING "style"::"public"."enum_pages_blocks_card_grid_style";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "style" SET DEFAULT 'card'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_style";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_style" AS ENUM('card', 'line', 'compact');
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "style" SET DEFAULT 'card'::"public"."enum__pages_v_blocks_card_grid_style";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_style" USING "style"::"public"."enum__pages_v_blocks_card_grid_style";
  DROP INDEX "pages_blocks_card_grid_items_image_idx";
  DROP INDEX "_pages_v_blocks_card_grid_items_image_idx";
  ALTER TABLE "pages_blocks_card_grid_items" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_card_grid_items" DROP COLUMN "image_id";`)
}
