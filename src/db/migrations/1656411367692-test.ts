import {MigrationInterface, QueryRunner} from "typeorm";

export class test1656411367692 implements MigrationInterface {
    name = 'test1656411367692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
