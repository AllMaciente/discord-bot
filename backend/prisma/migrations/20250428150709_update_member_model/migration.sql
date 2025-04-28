/*
  Warnings:

  - Made the column `displayName` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "displayName" SET NOT NULL;
