/*
  Warnings:

  - You are about to drop the column `language` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `levelLearnedAt` on the `Move` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "language",
DROP COLUMN "levelLearnedAt";
