/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `SpeciesFlavorTextEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SpeciesFlavorTextEntry_flavorText_key";

-- CreateIndex
CREATE UNIQUE INDEX "SpeciesFlavorTextEntry_id_key" ON "SpeciesFlavorTextEntry"("id");
