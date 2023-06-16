import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686650502202 implements MigrationInterface {
    name = 'Default1686650502202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "followerId" integer, "followingId" integer, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Posts" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "imageUrl" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_0f050d6d1112b2d07545b43f945" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comments" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e9f68503556c5d72a161ce38513"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`);
        await queryRunner.query(`DROP TABLE "Comments"`);
        await queryRunner.query(`DROP TABLE "Posts"`);
        await queryRunner.query(`DROP TABLE "follow"`);
    }

}
