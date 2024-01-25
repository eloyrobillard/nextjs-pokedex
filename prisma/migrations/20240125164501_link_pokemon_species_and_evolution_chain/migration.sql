/*
  Warnings:

  - You are about to drop the column `species` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pokemon` on the `Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[speciesId]` on the table `Chain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Species` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[evolutionChainId]` on the table `Species` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pokemonId]` on the table `Species` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `speciesId` to the `Chain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokedexId` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokemonId` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Made the column `typeId` on table `TypeName` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TypeName" DROP CONSTRAINT "TypeName_typeId_fkey";

-- AlterTable
ALTER TABLE "Chain" DROP COLUMN "species",
ADD COLUMN     "speciesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "species";

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "pokedexId" INTEGER NOT NULL,
ADD COLUMN     "pokemonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "pokemon";

-- AlterTable
ALTER TABLE "TypeName" ALTER COLUMN "typeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chain_speciesId_key" ON "Chain"("speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "Move_id_key" ON "Move"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_id_key" ON "Pokemon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Species_id_key" ON "Species"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Species_evolutionChainId_key" ON "Species"("evolutionChainId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_pokemonId_key" ON "Species"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "Type_id_key" ON "Type"("id");

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_evolutionChainId_fkey" FOREIGN KEY ("evolutionChainId") REFERENCES "EvolutionChain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chain" ADD CONSTRAINT "Chain_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeName" ADD CONSTRAINT "TypeName_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
