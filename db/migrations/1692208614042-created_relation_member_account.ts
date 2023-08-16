import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedRelationMemberAccount1692208614042 implements MigrationInterface {
    name = 'CreatedRelationMemberAccount1692208614042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "memberId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_b544da8d365f6610c769b04c28f" UNIQUE ("memberId")`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_b544da8d365f6610c769b04c28f" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_b544da8d365f6610c769b04c28f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_b544da8d365f6610c769b04c28f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "memberId"`);
    }

}
