/*
  Warnings:

  - You are about to drop the column `pokedexId` on the `Species` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Ailment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `DamageClass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Machine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MoveCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Species" DROP COLUMN "pokedexId";

-- CreateIndex
CREATE UNIQUE INDEX "Ailment_id_key" ON "Ailment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DamageClass_id_key" ON "DamageClass"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Machine_id_key" ON "Machine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MoveCategory_id_key" ON "MoveCategory"("id");
