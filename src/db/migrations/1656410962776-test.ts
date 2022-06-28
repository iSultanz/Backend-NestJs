import {MigrationInterface, QueryRunner} from "typeorm";

export class test1656410962776 implements MigrationInterface {
    name = 'test1656410962776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roles" character varying NOT NULL DEFAULT 'user', "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "abstract_class" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_04582a2930a448372f55e7abfb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "abstract_class"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
