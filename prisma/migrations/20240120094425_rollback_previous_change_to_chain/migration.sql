-- AlterTable
CREATE SEQUENCE chain_id_seq;
ALTER TABLE "Chain" ALTER COLUMN "id" SET DEFAULT nextval('chain_id_seq');
ALTER SEQUENCE chain_id_seq OWNED BY "Chain"."id";
