/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Chain` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Chain_evolutionChainId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Chain_id_key" ON "Chain"("id");
