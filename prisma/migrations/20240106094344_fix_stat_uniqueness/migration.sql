-- DropIndex
DROP INDEX "Stat_pokemonId_key";

-- AlterTable
ALTER TABLE "Stat" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stat_pkey" PRIMARY KEY ("id");
