const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ServiceChannel {
  async getChannels() {
    return await prisma.channel.findMany();
  }
  async getChannelById(id) {
    return await prisma.channel.findUnique({
      where: {
        channelId: id,
      },
    });
  }

  async getChannelsByGuildId(guildId, type) {
    return await prisma.channel.findMany({
      where: {
        guildId: guildId,
        ...(type !== null && { type: type }),
      },
    });
  }
  async upsertChannel(data) {
    return await prisma.channel.upsert({
      where: {
        channelId: data.channelId,
      },
      update: data,
      create: data,
    });
  }
  async deleteChannel(id) {
    const existingChannel = await prisma.channel.findUnique({
      where: {
        channelId: id,
      },
    });

    if (!existingChannel) {
      throw new Error("Channel not found");
    }

    return await prisma.channel.delete({
      where: {
        channelId: id,
      },
    });
  }
}

module.exports = new ServiceChannel();
