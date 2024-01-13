/*
  Warnings:

  - You are about to drop the column `Moves` on the `Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Name` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Name_name_key";

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "Moves",
ADD COLUMN     "moves" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Name_id_key" ON "Name"("id");
