import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_cta_style" ADD VALUE 'light';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_style" ADD VALUE 'light';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'navy'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('navy', 'navy-photo', 'soft');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'navy'::"public"."enum_pages_blocks_cta_style";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_cta_style" USING "style"::"public"."enum_pages_blocks_cta_style";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'navy'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('navy', 'navy-photo', 'soft');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'navy'::"public"."enum__pages_v_blocks_cta_style";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_cta_style" USING "style"::"public"."enum__pages_v_blocks_cta_style";`)
}
