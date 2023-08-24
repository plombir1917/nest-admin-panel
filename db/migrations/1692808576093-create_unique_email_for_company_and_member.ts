import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUniqueEmailForCompanyAndMember1692808576093
  implements MigrationInterface
{
  name = 'CreateUniqueEmailForCompanyAndMember1692808576093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "UQ_4678079964ab375b2b31849456c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`,
    );
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
  }
}
