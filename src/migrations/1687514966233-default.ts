import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687514966233 implements MigrationInterface {
  name = "Default1687514966233";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ADD "imageUrl" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "Comments" ADD CONSTRAINT "FK_comment_postId" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "imageUrl"`);
    await queryRunner.query(
      `ALTER TABLE "Comments" DROP CONSTRAINT "FK_comment_postId" FOREIGN KEY ("postId") REFERENCES "Posts"("id")`
    );
  }
}
