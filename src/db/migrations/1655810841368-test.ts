import {MigrationInterface, QueryRunner} from "typeorm";

export class test1655810841368 implements MigrationInterface {
    name = 'test1655810841368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test31" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test541" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test5411" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test5411"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test541"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test31"`);
    }

}
