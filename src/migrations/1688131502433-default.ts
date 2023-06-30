import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688131502433 implements MigrationInterface {
    name = 'Default1688131502433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Search" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Search" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
