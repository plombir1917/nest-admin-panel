import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedAccountJoincolumn1692835014533 implements MigrationInterface {
    name = 'FixedAccountJoincolumn1692835014533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "companyId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_2d01dcea17c1dbaa448a235ac57" UNIQUE ("companyId")`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
