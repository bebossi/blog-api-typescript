import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687967487416 implements MigrationInterface {
  name = "Default1687967487416";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_f1893ea82bd69980e2667505fca"`
    );
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_likes_postId" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_likes_postId"`
    );
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_f1893ea82bd69980e2667505fca" FOREIGN KEY ("postId") REFERENCES "Posts"("id")`
    );
  }
}
