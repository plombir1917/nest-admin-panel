import { MigrationInterface, QueryRunner } from "typeorm";

export class ValMig1688561489330 implements MigrationInterface {
    name = 'ValMig1688561489330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57" UNIQUE ("companyId")`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "login" character varying NOT NULL`);
    }

}
