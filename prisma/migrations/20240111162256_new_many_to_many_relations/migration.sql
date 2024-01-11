/*
  Warnings:

  - You are about to drop the column `evolutionDetails` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `evolvesTo` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `isBaby` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonId` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `EvolutionChain` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonId` on the `Genus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[speciesId]` on the table `EvolutionChain` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `speciesId` to the `EvolutionChain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ailmentChance` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ailmentId` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `critRate` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drain` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flinchChance` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healing` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statChance` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EvolutionChain" DROP CONSTRAINT "EvolutionChain_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "Genus" DROP CONSTRAINT "Genus_pokemonId_fkey";

-- DropIndex
DROP INDEX "EvolutionChain_pokemonId_key";

-- AlterTable
ALTER TABLE "EvolutionChain" DROP COLUMN "evolutionDetails",
DROP COLUMN "evolvesTo",
DROP COLUMN "isBaby",
DROP COLUMN "pokemonId",
DROP COLUMN "species",
ADD COLUMN     "speciesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Genus" DROP COLUMN "pokemonId";

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "ailmentChance" INTEGER NOT NULL,
ADD COLUMN     "ailmentId" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "critRate" INTEGER NOT NULL,
ADD COLUMN     "drain" INTEGER NOT NULL,
ADD COLUMN     "flinchChance" INTEGER NOT NULL,
ADD COLUMN     "healing" INTEGER NOT NULL,
ADD COLUMN     "maxHits" INTEGER,
ADD COLUMN     "maxTurns" INTEGER,
ADD COLUMN     "minHits" INTEGER,
ADD COLUMN     "minTurns" INTEGER,
ADD COLUMN     "statChance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "species" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Species" (
    "id" INTEGER NOT NULL,
    "baseHappiness" INTEGER NOT NULL,
    "captureRate" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "eggGroups" TEXT[],
    "evolvesFromSpecies" TEXT,
    "genderRate" INTEGER NOT NULL,
    "generation" TEXT NOT NULL,
    "growthRate" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "hasGenderDifferences" BOOLEAN NOT NULL,
    "hatchCounter" INTEGER NOT NULL,
    "isBaby" BOOLEAN NOT NULL,
    "isLegendary" BOOLEAN NOT NULL,
    "isMythical" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "shape" TEXT NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokedexEntry" (
    "id" SERIAL NOT NULL,
    "entry" INTEGER NOT NULL,
    "pokedex" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "PokedexEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesFlavorTextEntry" (
    "id" SERIAL NOT NULL,
    "flavorText" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "versionGroup" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "SpeciesFlavorTextEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "SpeciesName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variety" (
    "id" SERIAL NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "pokemon" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "Variety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chain" (
    "id" SERIAL NOT NULL,
    "evolutionChainId" INTEGER NOT NULL,
    "isBaby" BOOLEAN NOT NULL,
    "parentId" INTEGER,
    "species" TEXT NOT NULL,
    "gender" TEXT,
    "heldItem" TEXT[],
    "item" TEXT,
    "knownMove" TEXT,
    "knownMoveType" TEXT,
    "location" TEXT,
    "minAffection" INTEGER,
    "minBeauty" INTEGER,
    "minHappiness" INTEGER,
    "minLevel" INTEGER NOT NULL,
    "needsOverworldRain" BOOLEAN NOT NULL,
    "partySpecies" TEXT,
    "partyType" TEXT,
    "relativePhysicalStats" TEXT,
    "timeOfDay" TEXT NOT NULL,
    "tradeSpecies" TEXT,
    "trigger" TEXT NOT NULL,
    "turnUpsideDown" BOOLEAN NOT NULL,

    CONSTRAINT "Chain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ailment" (
    "id" INTEGER NOT NULL,
    "moves" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ailment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AilmentName" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ailmentId" INTEGER NOT NULL,

    CONSTRAINT "AilmentName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "moveName" TEXT NOT NULL,
    "versionGroup" TEXT NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveCategory" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MoveCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveCategoryDescription" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MoveCategoryDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenusToSpecies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MoveToPokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SpeciesFlavorTextEntry_flavorText_key" ON "SpeciesFlavorTextEntry"("flavorText");

-- CreateIndex
CREATE UNIQUE INDEX "SpeciesName_name_key" ON "SpeciesName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chain_evolutionChainId_key" ON "Chain"("evolutionChainId");

-- CreateIndex
CREATE UNIQUE INDEX "Machine_item_key" ON "Machine"("item");

-- CreateIndex
CREATE UNIQUE INDEX "_GenusToSpecies_AB_unique" ON "_GenusToSpecies"("A", "B");

-- CreateIndex
CREATE INDEX "_GenusToSpecies_B_index" ON "_GenusToSpecies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MoveToPokemon_AB_unique" ON "_MoveToPokemon"("A", "B");

-- CreateIndex
CREATE INDEX "_MoveToPokemon_B_index" ON "_MoveToPokemon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionChain_speciesId_key" ON "EvolutionChain"("speciesId");

-- AddForeignKey
ALTER TABLE "PokedexEntry" ADD CONSTRAINT "PokedexEntry_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesFlavorTextEntry" ADD CONSTRAINT "SpeciesFlavorTextEntry_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesName" ADD CONSTRAINT "SpeciesName_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variety" ADD CONSTRAINT "Variety_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvolutionChain" ADD CONSTRAINT "EvolutionChain_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chain" ADD CONSTRAINT "Chain_evolutionChainId_fkey" FOREIGN KEY ("evolutionChainId") REFERENCES "EvolutionChain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chain" ADD CONSTRAINT "Chain_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Chain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MoveCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AilmentName" ADD CONSTRAINT "AilmentName_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveCategoryDescription" ADD CONSTRAINT "MoveCategoryDescription_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MoveCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenusToSpecies" ADD CONSTRAINT "_GenusToSpecies_A_fkey" FOREIGN KEY ("A") REFERENCES "Genus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenusToSpecies" ADD CONSTRAINT "_GenusToSpecies_B_fkey" FOREIGN KEY ("B") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveToPokemon" ADD CONSTRAINT "_MoveToPokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveToPokemon" ADD CONSTRAINT "_MoveToPokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
