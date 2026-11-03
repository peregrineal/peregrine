import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "pages_blocks_split_content_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "pages_blocks_card_grid_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "pages_blocks_destinations_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "pages_blocks_timeline_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "pages_blocks_cta_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_split_content_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_destinations_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_timeline_buttons" ADD COLUMN "hide_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD COLUMN "hide_arrow" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "pages_blocks_split_content_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "pages_blocks_card_grid_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "pages_blocks_destinations_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "pages_blocks_timeline_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "pages_blocks_cta_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_hero_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_split_content_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_card_grid_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_destinations_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_timeline_buttons" DROP COLUMN "hide_arrow";
  ALTER TABLE "_pages_v_blocks_cta_buttons" DROP COLUMN "hide_arrow";`)
}
