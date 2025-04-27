const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DEFAULT_SETTINGS = [
  "modChannel",
  "voiceCategory",
  "voiceLobby",
  "nbaChannel",
];

class ServiceGuild {
  async getGuilds() {
    return await prisma.guild.findMany();
  }

  async getGuildByIdOrCreate(id) {
    let guild = await prisma.guild.findUnique({
      where: {
        guildId: id,
      },
    });

    if (!guild) {
      guild = await prisma.guild.create({
        data: {
          guildId: id,
        },
      });
    }

    return guild;
  }

  async upsertGuild(data) {
    const guild = await prisma.guild.upsert({
      where: {
        guildId: data.guildId,
      },
      update: data,
      create: data,
    });

    await this.ensureGuildConfigsExist(guild.guildId); // Só aqui!

    return guild;
  }

  async deleteGuild(id) {
    const existingGuild = await prisma.guild.findUnique({
      where: {
        guildId: id,
      },
    });

    if (!existingGuild) {
      throw new Error("Guild not found");
    }

    return await prisma.guild.delete({
      where: {
        guildId: id,
      },
    });
  }

  async ensureGuildConfigsExist(guildId) {
    const existingConfigs = await prisma.guildConfig.findMany({
      where: { guildId },
      select: { key: true },
    });

    const existingKeys = existingConfigs.map((cfg) => cfg.key);

    const missingKeys = DEFAULT_SETTINGS.filter(
      (key) => !existingKeys.includes(key)
    );

    if (missingKeys.length > 0) {
      await prisma.guildConfig.createMany({
        data: missingKeys.map((key) => ({
          guildId,
          key,
          value: null,
        })),
        skipDuplicates: true,
      });
    }
  }
}

module.exports = new ServiceGuild();
