import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687785549468 implements MigrationInterface {
  name = "Default1687785549468";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Likes" ("id" SERIAL NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_1c26def97ac3b554ea7c21be2c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_f1893ea82bd69980e2667505fca" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_eb14edaf42c147177b6f90ebf0c" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_eb14edaf42c147177b6f90ebf0c"`
    );
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_f1893ea82bd69980e2667505fca"`
    );
    await queryRunner.query(`DROP TABLE "Likes"`);
  }
}
