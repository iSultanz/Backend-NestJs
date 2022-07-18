import {MigrationInterface, QueryRunner} from "typeorm";

export class test1656577302252 implements MigrationInterface {
    name = 'test1656577302252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying`);
    }

}
