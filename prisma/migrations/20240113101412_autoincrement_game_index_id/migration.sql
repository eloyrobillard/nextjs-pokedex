/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `GameIndex` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE gameindex_id_seq;
ALTER TABLE "GameIndex" ALTER COLUMN "id" SET DEFAULT nextval('gameindex_id_seq');
ALTER SEQUENCE gameindex_id_seq OWNED BY "GameIndex"."id";

-- CreateIndex
CREATE UNIQUE INDEX "GameIndex_id_key" ON "GameIndex"("id");
