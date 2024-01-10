-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "height" DROP DEFAULT,
ALTER COLUMN "order" DROP DEFAULT,
ALTER COLUMN "sprite" DROP DEFAULT,
ALTER COLUMN "type1" DROP DEFAULT,
ALTER COLUMN "weight" DROP DEFAULT,
ALTER COLUMN "baseExperience" DROP DEFAULT,
ALTER COLUMN "isDefault" DROP DEFAULT;

-- CreateTable
CREATE TABLE "EvolutionChain" (
    "id" INTEGER NOT NULL,
    "isBaby" BOOLEAN NOT NULL,
    "species" TEXT NOT NULL,
    "evolutionDetails" TEXT,
    "evolvesTo" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "EvolutionChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameIndex" (
    "id" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "GameIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageClass" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DamageClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageClassDescription" (
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "damageClassId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DamageClassName" (
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "damageClassId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Move" (
    "id" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "damageClassId" INTEGER NOT NULL,
    "effectChance" INTEGER NOT NULL,
    "generation" TEXT NOT NULL,
    "learnedByPokemon" TEXT[],
    "levelLearnedAt" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveName" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "MoveName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlavorTextEntry" (
    "id" SERIAL NOT NULL,
    "flavorText" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "versionGroup" TEXT NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "FlavorTextEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectEntry" (
    "id" SERIAL NOT NULL,
    "effect" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "shortEffect" TEXT NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "EffectEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionChain_pokemonId_key" ON "EvolutionChain"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "DamageClassDescription_description_key" ON "DamageClassDescription"("description");

-- CreateIndex
CREATE UNIQUE INDEX "DamageClassName_name_key" ON "DamageClassName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MoveName_name_key" ON "MoveName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FlavorTextEntry_flavorText_key" ON "FlavorTextEntry"("flavorText");

-- CreateIndex
CREATE UNIQUE INDEX "EffectEntry_effect_key" ON "EffectEntry"("effect");

-- AddForeignKey
ALTER TABLE "EvolutionChain" ADD CONSTRAINT "EvolutionChain_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameIndex" ADD CONSTRAINT "GameIndex_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageClassDescription" ADD CONSTRAINT "DamageClassDescription_damageClassId_fkey" FOREIGN KEY ("damageClassId") REFERENCES "DamageClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageClassName" ADD CONSTRAINT "DamageClassName_damageClassId_fkey" FOREIGN KEY ("damageClassId") REFERENCES "DamageClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_damageClassId_fkey" FOREIGN KEY ("damageClassId") REFERENCES "DamageClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveName" ADD CONSTRAINT "MoveName_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlavorTextEntry" ADD CONSTRAINT "FlavorTextEntry_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectEntry" ADD CONSTRAINT "EffectEntry_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
