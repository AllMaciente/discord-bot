/*
  Warnings:

  - A unique constraint covering the columns `[guildId,key]` on the table `GuildConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuildConfig_guildId_key_key" ON "GuildConfig"("guildId", "key");
