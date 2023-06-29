import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688027766342 implements MigrationInterface {
  name = "Default1688027766342";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "password" SET DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "password" DROP DEFAULT`
    );
  }
}
