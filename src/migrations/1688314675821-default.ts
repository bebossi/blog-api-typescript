import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688314675821 implements MigrationInterface {
    name = 'Default1688314675821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Message" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "recipientId" integer, "chatId" integer, CONSTRAINT "PK_7dd6398f0d1dcaf73df342fa325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" DROP CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c"`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" ADD CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c" PRIMARY KEY ("usersId", "chatId")`);
        await queryRunner.query(`ALTER TABLE "Message" ADD CONSTRAINT "FK_2bb6aae64e0ff3bdf45d6deabfe" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Message" ADD CONSTRAINT "FK_24faf0aa712d246b798afbd8a63" FOREIGN KEY ("recipientId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Message" ADD CONSTRAINT "FK_c5370d7d3bc8ee603a401aee50e" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Message" DROP CONSTRAINT "FK_c5370d7d3bc8ee603a401aee50e"`);
        await queryRunner.query(`ALTER TABLE "Message" DROP CONSTRAINT "FK_24faf0aa712d246b798afbd8a63"`);
        await queryRunner.query(`ALTER TABLE "Message" DROP CONSTRAINT "FK_2bb6aae64e0ff3bdf45d6deabfe"`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" DROP CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c"`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" ADD CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "Message"`);
    }

}
