/*
  Warnings:

  - You are about to drop the column `modChannel` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `nbaChannel` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `voiceCategory` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `voiceLobby` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "modChannel",
DROP COLUMN "nbaChannel",
DROP COLUMN "voiceCategory",
DROP COLUMN "voiceLobby",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Member" (
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "bot" BOOLEAN NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "GuildConfig" (
    "id" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "GuildConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildConfig" ADD CONSTRAINT "GuildConfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;
