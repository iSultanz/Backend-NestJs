import {MigrationInterface, QueryRunner} from "typeorm";

export class test1656574197693 implements MigrationInterface {
    name = 'test1656574197693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

}
