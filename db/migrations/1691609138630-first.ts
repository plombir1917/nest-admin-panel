import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1691609138630 implements MigrationInterface {
  name = 'First1691609138630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "companyId" integer, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "REL_2d01dcea17c1dbaa448a235ac5" UNIQUE ("companyId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
