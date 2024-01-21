/*
  Warnings:

  - Made the column `tradeSpecies` on table `Chain` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chain" ALTER COLUMN "tradeSpecies" SET NOT NULL;
