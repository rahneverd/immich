import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionSyncStateTable1729716862128 implements MigrationInterface {
    name = 'AddSessionSyncStateTable1729716862128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_sync_states" ("sessionId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "assets" TIMESTAMP WITH TIME ZONE, "albums" TIMESTAMP WITH TIME ZONE, "albumAssets" TIMESTAMP WITH TIME ZONE, "albumUsers" TIMESTAMP WITH TIME ZONE, "activities" TIMESTAMP WITH TIME ZONE, "memories" TIMESTAMP WITH TIME ZONE, "partners" TIMESTAMP WITH TIME ZONE, "people" TIMESTAMP WITH TIME ZONE, "sharedLinks" TIMESTAMP WITH TIME ZONE, "stacks" TIMESTAMP WITH TIME ZONE, "tags" TIMESTAMP WITH TIME ZONE, "users" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_4821e7414daba4413b8b33546d1" PRIMARY KEY ("sessionId"))`);
        await queryRunner.query(`ALTER TABLE "session_sync_states" ADD CONSTRAINT "FK_4821e7414daba4413b8b33546d1" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_sync_states" DROP CONSTRAINT "FK_4821e7414daba4413b8b33546d1"`);
        await queryRunner.query(`DROP TABLE "session_sync_states"`);
    }

}
