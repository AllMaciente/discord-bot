/*
  Warnings:

  - Made the column `ownerId` on table `Guild` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_ownerId_fkey";

-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
