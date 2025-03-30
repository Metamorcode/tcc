import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1743362028954 implements MigrationInterface {
    name = ' $npmConfigName1743362028954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "elderlies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_3c08fc6d65751f3b25e04cccade" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "eventTime" TIMESTAMP NOT NULL, "repeatFor" integer NOT NULL, "completed" boolean NOT NULL DEFAULT false, "userId" character varying NOT NULL, "category_id" uuid, "elderly_id" uuid, "user_id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('CREATOR', 'EXECUTOR', 'FAMILYMEMBER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."medicines_unit_enum" AS ENUM('UNIDADE', 'ML', 'COMPRIMIDOS')`);
        await queryRunner.query(`CREATE TABLE "medicines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unit" "public"."medicines_unit_enum" NOT NULL, CONSTRAINT "PK_77b93851766f7ab93f71f44b18b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_8535ab17ae3a69c533869b6c42f" FOREIGN KEY ("elderly_id") REFERENCES "elderlies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_8535ab17ae3a69c533869b6c42f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905"`);
        await queryRunner.query(`DROP TABLE "medicines"`);
        await queryRunner.query(`DROP TYPE "public"."medicines_unit_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "elderlies"`);
    }

}
