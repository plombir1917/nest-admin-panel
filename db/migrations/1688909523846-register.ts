import { MigrationInterface, QueryRunner } from 'typeorm';

export class Register1688909523846 implements MigrationInterface {
  name = 'Register1688909523846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "companyId"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c"`,
    );
    await queryRunner.query(`ALTER TABLE "account" ADD "companyId" integer`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57" UNIQUE ("companyId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
