import { MigrationInterface, QueryRunner } from 'typeorm';

export class EndedMemberEventEntity1692641913019 implements MigrationInterface {
  name = 'EndedMemberEventEntity1692641913019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_to_event" RENAME COLUMN "memberToEventId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_to_event" RENAME CONSTRAINT "PK_8e2f8a224caa5a7135cdae48249" TO "PK_2a27adb26f1af107d302770058f"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "member_to_event_memberToEventId_seq" RENAME TO "member_to_event_id_seq"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER SEQUENCE "member_to_event_id_seq" RENAME TO "member_to_event_memberToEventId_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_to_event" RENAME CONSTRAINT "PK_2a27adb26f1af107d302770058f" TO "PK_8e2f8a224caa5a7135cdae48249"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_to_event" RENAME COLUMN "id" TO "memberToEventId"`,
    );
  }
}
