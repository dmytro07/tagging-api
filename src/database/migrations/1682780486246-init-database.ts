import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1682780486246 implements MigrationInterface {
    name = 'InitDatabase1682780486246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying(60) NOT NULL, "lastName" character varying(60) NOT NULL, "email" character varying(320) NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(60) NOT NULL, "color" character varying(20) NOT NULL, "authorId" uuid, CONSTRAINT "PK_61aa7408a426fea5dd8416f5a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(60) NOT NULL, "price" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_tags_tags" ("usersId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_3341c5e43f34ad2f7fb10d60480" PRIMARY KEY ("usersId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e36e86825bbc09e1fc9d3c83fb" ON "users_tags_tags" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9de46fe02d9d7488f92bedf417" ON "users_tags_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "orders_tags_tags" ("ordersId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_672693a1519de29ac3c64c7f734" PRIMARY KEY ("ordersId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6509af5160ccca3289c7087acf" ON "orders_tags_tags" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ceb25c49d566de098a4bd4055a" ON "orders_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "Tags" ADD CONSTRAINT "FK_af0f9d87195f1957db6a128a4cf" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_cc257418e0228f05a8d7dcc5553" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_e36e86825bbc09e1fc9d3c83fb0" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_tags_tags" ADD CONSTRAINT "FK_6509af5160ccca3289c7087acf6" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_tags_tags" ADD CONSTRAINT "FK_ceb25c49d566de098a4bd4055af" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_tags_tags" DROP CONSTRAINT "FK_ceb25c49d566de098a4bd4055af"`);
        await queryRunner.query(`ALTER TABLE "orders_tags_tags" DROP CONSTRAINT "FK_6509af5160ccca3289c7087acf6"`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176"`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_e36e86825bbc09e1fc9d3c83fb0"`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_cc257418e0228f05a8d7dcc5553"`);
        await queryRunner.query(`ALTER TABLE "Tags" DROP CONSTRAINT "FK_af0f9d87195f1957db6a128a4cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ceb25c49d566de098a4bd4055a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6509af5160ccca3289c7087acf"`);
        await queryRunner.query(`DROP TABLE "orders_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9de46fe02d9d7488f92bedf417"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e36e86825bbc09e1fc9d3c83fb"`);
        await queryRunner.query(`DROP TABLE "users_tags_tags"`);
        await queryRunner.query(`DROP TABLE "Orders"`);
        await queryRunner.query(`DROP TABLE "Tags"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
