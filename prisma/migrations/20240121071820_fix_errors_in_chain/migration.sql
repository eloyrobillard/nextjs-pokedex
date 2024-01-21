/*
  Warnings:

  - The `gender` column on the `Chain` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `relativePhysicalStats` column on the `Chain` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chain" DROP COLUMN "gender",
ADD COLUMN     "gender" INTEGER,
ALTER COLUMN "heldItem" DROP NOT NULL,
ALTER COLUMN "heldItem" SET DATA TYPE TEXT,
DROP COLUMN "relativePhysicalStats",
ADD COLUMN     "relativePhysicalStats" INTEGER;
