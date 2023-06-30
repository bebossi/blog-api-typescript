import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688120727477 implements MigrationInterface {
  name = "Default1688120727477";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Search" ("id" SERIAL NOT NULL, "search" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d1bcd714e9b3fd9c56b80e68ca1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Search" ADD CONSTRAINT "FK_b3be1fa9a79990e436972c1e14f" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Search" DROP CONSTRAINT "FK_b3be1fa9a79990e436972c1e14f"`
    );
    await queryRunner.query(`DROP TABLE "Search"`);
  }
}
