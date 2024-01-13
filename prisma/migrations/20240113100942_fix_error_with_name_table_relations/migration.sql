/*
  Warnings:

  - You are about to drop the column `pokemonId` on the `Name` table. All the data in the column will be lost.
  - You are about to drop the `SpeciesName` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `speciesId` to the `Name` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Name" DROP CONSTRAINT "Name_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "SpeciesName" DROP CONSTRAINT "SpeciesName_speciesId_fkey";

-- AlterTable
ALTER TABLE "Name" DROP COLUMN "pokemonId",
ADD COLUMN     "speciesId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SpeciesName";

-- AddForeignKey
ALTER TABLE "Name" ADD CONSTRAINT "Name_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
