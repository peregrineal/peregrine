import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "enquiries_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  ALTER TABLE "enquiries_answers" ADD CONSTRAINT "enquiries_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "enquiries_answers_order_idx" ON "enquiries_answers" USING btree ("_order");
  CREATE INDEX "enquiries_answers_parent_id_idx" ON "enquiries_answers" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "enquiries_answers" CASCADE;`)
}
