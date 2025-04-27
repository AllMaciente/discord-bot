-- DropForeignKey
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_ownerId_fkey";

-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "ownerId" DROP NOT NULL;
