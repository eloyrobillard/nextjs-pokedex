/*
  Warnings:

  - You are about to drop the column `base_experience` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `is_default` on the `Pokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "base_experience",
DROP COLUMN "is_default",
ADD COLUMN     "abilites" TEXT[],
ADD COLUMN     "baseExperience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonSpecies" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "genus" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "PokemonSpecies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonName" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "PokemonName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "baseStat" INTEGER NOT NULL,
    "effort" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stat_name_key" ON "Stat"("name");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonSpecies" ADD CONSTRAINT "PokemonSpecies_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonName" ADD CONSTRAINT "PokemonName_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
