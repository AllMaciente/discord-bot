const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  async createGuild(data) {
    const existingGuild = await prisma.guild.findUnique({
      where: {
        guildId: data.guildId,
      },
    });

    if (existingGuild) {
      throw new Error("Guild already exists");
    }

    return await prisma.guild.create({
      data: data,
    });
  }
  async updateGuild(data) {
    const existingGuild = await prisma.guild.findUnique({
      where: {
        guildId: data.guildId,
      },
    });

    if (!existingGuild) {
      throw new Error("Guild not found");
    }

    return await prisma.guild.update({
      where: {
        guildId: data.guildId,
      },
      data: data,
    });
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
}

module.exports = new ServiceGuild();
