const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ServiceGuildConfig {
  async getGuildConfig(guildId, key) {
    return await prisma.guildConfig.findUnique({
      where: {
        guildId_key: {
          guildId: guildId,
          key: key,
        },
      },
    });
  }
  async getGuildConfigs(guildId) {
    return await prisma.guildConfig.findMany({
      where: {
        guildId: guildId,
      },
    });
  }
  async upsertGuildConfig(data) {
    const guildConfig = await prisma.guildConfig.upsert({
      where: {
        guildId_key: {
          guildId: data.guildId,
          key: data.key,
        },
      },
      update: data,
      create: data,
    });
    return guildConfig;
  }
  async deleteGuildConfig(guildId, key) {
    const existingGuildConfig = await prisma.guildConfig.findUnique({
      where: {
        guildId_key: {
          guildId: guildId,
          key: key,
        },
      },
    });
    if (!existingGuildConfig) {
      throw new Error("GuildConfig not found");
    }
    return await prisma.guildConfig.delete({
      where: {
        guildId_key: {
          guildId: guildId,
          key: key,
        },
      },
    });
  }
}
module.exports = new ServiceGuildConfig();
