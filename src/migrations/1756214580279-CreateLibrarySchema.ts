import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLibrarySchema1756214580279 implements MigrationInterface {
    name = 'CreateLibrarySchema1756214580279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ADD "isbn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn")`);
        await queryRunner.query(`ALTER TABLE "book" ADD "pages" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "publisherId" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "publisherId"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "pages"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "isbn"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
    }

}
