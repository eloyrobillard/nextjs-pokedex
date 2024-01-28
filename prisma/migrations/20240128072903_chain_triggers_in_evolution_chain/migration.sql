/*
  Warnings:

  - You are about to drop the column `gender` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `heldItem` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `knownMove` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `knownMoveType` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `minAffection` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `minBeauty` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `minHappiness` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `minLevel` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `needsOverworldRain` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `partySpecies` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `partyType` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `relativePhysicalStats` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `timeOfDay` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `tradeSpecies` on the `Chain` table. All the data in the column will be lost.
  - You are about to drop the column `turnUpsideDown` on the `Chain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chain" DROP COLUMN "gender",
DROP COLUMN "heldItem",
DROP COLUMN "item",
DROP COLUMN "knownMove",
DROP COLUMN "knownMoveType",
DROP COLUMN "location",
DROP COLUMN "minAffection",
DROP COLUMN "minBeauty",
DROP COLUMN "minHappiness",
DROP COLUMN "minLevel",
DROP COLUMN "needsOverworldRain",
DROP COLUMN "partySpecies",
DROP COLUMN "partyType",
DROP COLUMN "relativePhysicalStats",
DROP COLUMN "timeOfDay",
DROP COLUMN "tradeSpecies",
DROP COLUMN "turnUpsideDown";

-- CreateTable
CREATE TABLE "EvolutionDetails" (
    "id" SERIAL NOT NULL,
    "chainId" INTEGER NOT NULL,
    "gender" INTEGER,
    "heldItem" TEXT,
    "item" TEXT,
    "knownMove" TEXT,
    "knownMoveType" TEXT,
    "location" TEXT,
    "minAffection" INTEGER,
    "minBeauty" INTEGER,
    "minHappiness" INTEGER,
    "minLevel" INTEGER,
    "needsOverworldRain" BOOLEAN NOT NULL,
    "partySpecies" TEXT,
    "partyType" TEXT,
    "relativePhysicalStats" INTEGER,
    "timeOfDay" TEXT,
    "tradeSpecies" TEXT,
    "turnUpsideDown" BOOLEAN NOT NULL,

    CONSTRAINT "EvolutionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionDetails_chainId_key" ON "EvolutionDetails"("chainId");

-- AddForeignKey
ALTER TABLE "EvolutionDetails" ADD CONSTRAINT "EvolutionDetails_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
