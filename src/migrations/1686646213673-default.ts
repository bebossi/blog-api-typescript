import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686646213673 implements MigrationInterface {
    name = 'Default1686646213673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_b2ee401c9d5288def8a87c559a0" UNIQUE ("userName"), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
