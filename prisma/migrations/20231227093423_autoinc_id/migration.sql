/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE pokemon_id_seq;
ALTER TABLE "Pokemon" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('pokemon_id_seq');
ALTER SEQUENCE pokemon_id_seq OWNED BY "Pokemon"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_url_key" ON "Pokemon"("url");
