import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "closing_above" boolean;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN "closing_above" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "closing_above";
  ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN "closing_above";`)
}
