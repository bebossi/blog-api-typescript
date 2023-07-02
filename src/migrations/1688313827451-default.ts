import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688313827451 implements MigrationInterface {
  name = "Default1688313827451";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Chat" ("id" SERIAL NOT NULL, CONSTRAINT "PK_d9fa791e91c30baf21d778d3f2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_chats_chat" ("id" SERIAL NOT NULL, "usersId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c" PRIMARY KEY ("id"), CONSTRAINT "FK_5937b033223a9f80a2338efe426" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5937b033223a9f80a2338efe42" ON "users_chats_chat" ("usersId")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0c01a6065a43f9bb1bcf460a9" ON "users_chats_chat" ("chatId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_5937b033223a9f80a2338efe426"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0c01a6065a43f9bb1bcf460a9"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5937b033223a9f80a2338efe42"`
    );
    await queryRunner.query(`DROP TABLE "users_chats_chat"`);
    await queryRunner.query(`DROP TABLE "Chat"`);
  }
}
