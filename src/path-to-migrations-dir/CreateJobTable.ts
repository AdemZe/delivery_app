import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobTable implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "job_entity" (
                "id" SERIAL PRIMARY KEY,
                "job_name" character varying(20) NOT NULL,
                "city" character varying(20) NOT NULL,
                "address" character varying(20) NOT NULL,
                "phone_number" character varying NOT NULL,
                "ownerId" integer,
                CONSTRAINT "FK_owner" FOREIGN KEY ("ownerId") REFERENCES "user_entity"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job_entity"`);
    }
}
