import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedDescriptionColumnRoles1692810037328 implements MigrationInterface {
    name = 'DeletedDescriptionColumnRoles1692810037328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying NOT NULL`);
    }

}
