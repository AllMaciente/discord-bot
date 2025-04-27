const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

const SETTINGS_TEMPLATE_PATH = path.resolve(
  __dirname,
  "../../settings_template.json"
);
const DEFAULT_SETTINGS = JSON.parse(
  fs.readFileSync(SETTINGS_TEMPLATE_PATH, "utf-8")
);

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

    const missingConfigs = DEFAULT_SETTINGS.filter(
      (config) => !existingKeys.includes(config.key)
    );

    if (missingConfigs.length > 0) {
      await prisma.guildConfig.createMany({
        data: missingConfigs.map((config) => ({
          guildId,
          key: config.key,
          value: config.value,
          type: config.type, // Adicionando o tipo
        })),
        skipDuplicates: true,
      });
    }
  }
}

module.exports = new ServiceGuild();
