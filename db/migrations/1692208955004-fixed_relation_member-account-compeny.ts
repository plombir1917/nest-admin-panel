import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedRelationMemberAccountCompeny1692208955004 implements MigrationInterface {
    name = 'FixedRelationMemberAccountCompeny1692208955004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_b544da8d365f6610c769b04c28f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "REL_2d01dcea17c1dbaa448a235ac5"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_b544da8d365f6610c769b04c28f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "memberId"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "UQ_c1012c9a3cdedf2b00510cdd845" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "company" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_6a1f21580eb0731c7322c08d7df" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_c1012c9a3cdedf2b00510cdd845" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_6a1f21580eb0731c7322c08d7df" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_6a1f21580eb0731c7322c08d7df"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_c1012c9a3cdedf2b00510cdd845"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_6a1f21580eb0731c7322c08d7df"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "UQ_c1012c9a3cdedf2b00510cdd845"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "memberId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_b544da8d365f6610c769b04c28f" UNIQUE ("memberId")`);
        await queryRunner.query(`ALTER TABLE "account" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "REL_2d01dcea17c1dbaa448a235ac5" UNIQUE ("companyId")`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_b544da8d365f6610c769b04c28f" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_2d01dcea17c1dbaa448a235ac57" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
