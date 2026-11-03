import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_grid_items_flag" AS ENUM('GB', 'US', 'CA', 'DE', 'AT', 'IT', 'ES', 'CH', 'NL', 'BE', 'LU', 'CZ', 'PL', 'HU', 'NO', 'FI', 'SE', 'EE', 'LV', 'LT', 'AL');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_items_flag" AS ENUM('GB', 'US', 'CA', 'DE', 'AT', 'IT', 'ES', 'CH', 'NL', 'BE', 'LU', 'CZ', 'PL', 'HU', 'NO', 'FI', 'SE', 'EE', 'LV', 'LT', 'AL');
  ALTER TABLE "pages_blocks_card_grid_items" ADD COLUMN "flag" "enum_pages_blocks_card_grid_items_flag";
  ALTER TABLE "_pages_v_blocks_card_grid_items" ADD COLUMN "flag" "enum__pages_v_blocks_card_grid_items_flag";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid_items" DROP COLUMN "flag";
  ALTER TABLE "_pages_v_blocks_card_grid_items" DROP COLUMN "flag";
  DROP TYPE "public"."enum_pages_blocks_card_grid_items_flag";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_items_flag";`)
}
