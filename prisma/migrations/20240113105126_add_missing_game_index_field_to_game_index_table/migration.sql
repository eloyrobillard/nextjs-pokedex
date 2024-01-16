/*
  Warnings:

  - Added the required column `gameIndex` to the `GameIndex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameIndex" ADD COLUMN     "gameIndex" INTEGER NOT NULL;
