/*
  Warnings:

  - You are about to drop the column `abilites` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the `PokemonName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonSpecies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PokemonName" DROP CONSTRAINT "PokemonName_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonSpecies" DROP CONSTRAINT "PokemonSpecies_pokemonId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "abilites",
ADD COLUMN     "abilities" TEXT[];

-- DropTable
DROP TABLE "PokemonName";

-- DropTable
DROP TABLE "PokemonSpecies";

-- CreateTable
CREATE TABLE "Genus" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "genus" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Genus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Name" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Name_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Genus" ADD CONSTRAINT "Genus_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Name" ADD CONSTRAINT "Name_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
