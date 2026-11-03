import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_split_content_image_side" ADD VALUE 'none';
  ALTER TYPE "public"."enum__pages_v_blocks_split_content_image_side" ADD VALUE 'none';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "image_side" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "image_side" SET DEFAULT 'right'::text;
  DROP TYPE "public"."enum_pages_blocks_split_content_image_side";
  CREATE TYPE "public"."enum_pages_blocks_split_content_image_side" AS ENUM('right', 'left');
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "image_side" SET DEFAULT 'right'::"public"."enum_pages_blocks_split_content_image_side";
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "image_side" SET DATA TYPE "public"."enum_pages_blocks_split_content_image_side" USING "image_side"::"public"."enum_pages_blocks_split_content_image_side";
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "image_side" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "image_side" SET DEFAULT 'right'::text;
  DROP TYPE "public"."enum__pages_v_blocks_split_content_image_side";
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_image_side" AS ENUM('right', 'left');
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "image_side" SET DEFAULT 'right'::"public"."enum__pages_v_blocks_split_content_image_side";
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "image_side" SET DATA TYPE "public"."enum__pages_v_blocks_split_content_image_side" USING "image_side"::"public"."enum__pages_v_blocks_split_content_image_side";`)
}
