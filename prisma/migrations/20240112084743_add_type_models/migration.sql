-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL,
    "doubleDamageFrom" TEXT[],
    "doubleDamageTo" TEXT[],
    "halfDamageFrom" TEXT[],
    "halfDamageTo" TEXT[],
    "noDamageFrom" TEXT[],
    "noDamageTo" TEXT[],
    "generation" TEXT NOT NULL,
    "moveDamageClass" TEXT NOT NULL,
    "Moves" TEXT[],
    "name" TEXT NOT NULL,
    "pokemon" TEXT[],

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeGameIndex" (
    "id" SERIAL NOT NULL,
    "gameIndex" INTEGER NOT NULL,
    "generation" TEXT NOT NULL,
    "typeId" INTEGER,

    CONSTRAINT "TypeGameIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeName" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER,

    CONSTRAINT "TypeName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeGameIndex_id_key" ON "TypeGameIndex"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeName_id_key" ON "TypeName"("id");

-- AddForeignKey
ALTER TABLE "TypeGameIndex" ADD CONSTRAINT "TypeGameIndex_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeName" ADD CONSTRAINT "TypeName_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
