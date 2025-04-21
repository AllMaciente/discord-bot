/*
  Warnings:

  - You are about to drop the column `modChennel` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `nbaChennel` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "modChennel",
DROP COLUMN "nbaChennel",
ADD COLUMN     "modChannel" TEXT,
ADD COLUMN     "nbaChannel" TEXT;
