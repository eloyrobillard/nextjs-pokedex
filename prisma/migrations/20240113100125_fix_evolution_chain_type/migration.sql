/*
  Warnings:

  - You are about to drop the column `speciesId` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `versionGroup` on the `SpeciesFlavorTextEntry` table. All the data in the column will be lost.
  - Added the required column `evolutionChainId` to the `Species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `SpeciesFlavorTextEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EvolutionChain" DROP CONSTRAINT "EvolutionChain_speciesId_fkey";

-- DropIndex
DROP INDEX "EvolutionChain_speciesId_key";

-- AlterTable
ALTER TABLE "EvolutionChain" DROP COLUMN "speciesId";

-- AlterTable
ALTER TABLE "Species" ADD COLUMN     "evolutionChainId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpeciesFlavorTextEntry" DROP COLUMN "versionGroup",
ADD COLUMN     "version" TEXT NOT NULL;
