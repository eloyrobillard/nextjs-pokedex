/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `EvolutionChain` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Species_evolutionChainId_key";

-- AlterTable
ALTER TABLE "Species" ALTER COLUMN "hatchCounter" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionChain_id_key" ON "EvolutionChain"("id");
