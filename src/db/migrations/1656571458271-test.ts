import {MigrationInterface, QueryRunner} from "typeorm";

export class test1656571458271 implements MigrationInterface {
    name = 'test1656571458271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test" character varying NOT NULL`);
    }

}
