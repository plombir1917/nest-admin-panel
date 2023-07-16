import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewEntityEvent1689323044716 implements MigrationInterface {
  name = 'NewEntityEvent1689323044716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "date" TIMESTAMP NOT NULL`,
    );
  }
}
