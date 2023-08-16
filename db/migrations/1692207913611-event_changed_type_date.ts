import { MigrationInterface, QueryRunner } from "typeorm";

export class EventChangedTypeDate1692207913611 implements MigrationInterface {
    name = 'EventChangedTypeDate1692207913611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "date" TIMESTAMP NOT NULL`);
    }

}
