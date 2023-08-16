import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoles1692116655397 implements MigrationInterface {
    name = 'CreateRoles1692116655397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
