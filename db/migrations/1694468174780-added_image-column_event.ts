import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedImageColumnEvent1694468174780 implements MigrationInterface {
    name = 'AddedImageColumnEvent1694468174780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "image"`);
    }

}
