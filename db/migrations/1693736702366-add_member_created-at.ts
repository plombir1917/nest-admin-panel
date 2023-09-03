import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMemberCreatedAt1693736702366 implements MigrationInterface {
  name = 'AddMemberCreatedAt1693736702366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "createdAt"`);
  }
}
