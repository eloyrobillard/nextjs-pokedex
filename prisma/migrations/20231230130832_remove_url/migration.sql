/*
  Warnings:

  - You are about to drop the column `url` on the `Pokemon` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pokemon_url_key";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "url";
