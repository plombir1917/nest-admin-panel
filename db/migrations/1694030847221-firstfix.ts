import { MigrationInterface, QueryRunner } from "typeorm";

export class Firstfix1694030847221 implements MigrationInterface {
    name = 'Firstfix1694030847221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email"), CONSTRAINT "REL_c1012c9a3cdedf2b00510cdd84" UNIQUE ("accountId"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_to_event" ("id" SERIAL NOT NULL, "memberId" integer, "eventId" integer, CONSTRAINT "PK_2a27adb26f1af107d302770058f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "place" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "companyId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "info" character varying NOT NULL, "accountId" integer, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "REL_6a1f21580eb0731c7322c08d7d" UNIQUE ("accountId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" integer, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_c1012c9a3cdedf2b00510cdd845" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_to_event" ADD CONSTRAINT "FK_dce0b94729ea6969836d39318d4" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_to_event" ADD CONSTRAINT "FK_ad3f54752c9f90782b6c21676b9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_6a1f21580eb0731c7322c08d7df" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_6a1f21580eb0731c7322c08d7df"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f"`);
        await queryRunner.query(`ALTER TABLE "member_to_event" DROP CONSTRAINT "FK_ad3f54752c9f90782b6c21676b9"`);
        await queryRunner.query(`ALTER TABLE "member_to_event" DROP CONSTRAINT "FK_dce0b94729ea6969836d39318d4"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_c1012c9a3cdedf2b00510cdd845"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "member_to_event"`);
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
