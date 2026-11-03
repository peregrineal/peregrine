import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "form_note" SET DEFAULT 'The purpose of this form is to understand your requests, preferences and goals, so that we can offer you the most suitable, personalised consultation. Fields marked * are required. Please do not send passports or financial records at this stage.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "form_note" SET DEFAULT 'The purpose of this form is to understand your requests, preferences and goals, so that we can offer you the most suitable, personalised consultation. Fields marked * are required. Please do not send passports or financial records at this stage.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_booking_locales" ALTER COLUMN "form_note" SET DEFAULT 'Fields marked * are required. Please do not send passports or financial records at this stage.';
  ALTER TABLE "_pages_v_blocks_booking_locales" ALTER COLUMN "form_note" SET DEFAULT 'Fields marked * are required. Please do not send passports or financial records at this stage.';`)
}
