/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[genus]` on the table `Genus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Name` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_name_key" ON "Form"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genus_genus_key" ON "Genus"("genus");

-- CreateIndex
CREATE UNIQUE INDEX "Name_name_key" ON "Name"("name");
