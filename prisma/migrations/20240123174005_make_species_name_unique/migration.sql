/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Species` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");
