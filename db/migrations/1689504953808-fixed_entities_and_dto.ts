import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedEntitiesAndDto1689504953808 implements MigrationInterface {
  name = 'FixedEntitiesAndDto1689504953808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" RENAME COLUMN "surname" TO "email"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "surname"`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "admin"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "admin" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD "surname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" RENAME COLUMN "email" TO "surname"`,
    );
  }
}
