/*
  Warnings:

  - A unique constraint covering the columns `[pokemonId]` on the table `Stat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Stat_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Stat_pokemonId_key" ON "Stat"("pokemonId");
