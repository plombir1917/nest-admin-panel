import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedEntitieMemberFk1689505306639 implements MigrationInterface {
    name = 'FixedEntitieMemberFk1689505306639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member_event_event" ("memberId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_9feacb87c4e6ccf0f647c0415db" PRIMARY KEY ("memberId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_892001ecd7d511ab32ffb70ba5" ON "member_event_event" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ae9e3777bf5c36bd4ea515418" ON "member_event_event" ("eventId") `);
        await queryRunner.query(`ALTER TABLE "member_event_event" ADD CONSTRAINT "FK_892001ecd7d511ab32ffb70ba59" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_event_event" ADD CONSTRAINT "FK_4ae9e3777bf5c36bd4ea5154184" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_event_event" DROP CONSTRAINT "FK_4ae9e3777bf5c36bd4ea5154184"`);
        await queryRunner.query(`ALTER TABLE "member_event_event" DROP CONSTRAINT "FK_892001ecd7d511ab32ffb70ba59"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ae9e3777bf5c36bd4ea515418"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_892001ecd7d511ab32ffb70ba5"`);
        await queryRunner.query(`DROP TABLE "member_event_event"`);
    }

}
