const ServiceGuild = require("./../service/guild");
const { GuildSchema } = require("./../schema/guild.schema");
class ControllerGuild {
  async getGuilds(req, res) {
    try {
      const guilds = await ServiceGuild.getGuilds();
      return res.status(200).json(guilds);
    } catch (error) {
      console.error("Error getting guilds:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getGuildById(req, res) {
    try {
      const { id } = req.params;
      const guild = await ServiceGuild.getGuildByIdOrCreate(id);
      return res.status(200).json(guild);
    } catch (error) {
      console.error("Error getting guild:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async createGuild(req, res) {
    try {
      const { body } = req;

      const validatedData = GuildSchema.parse(body);
      const guild = await ServiceGuild.upsertGuild(validatedData);
      return res.status(200).json(guild);
    } catch (error) {
      console.error("Error creating guild:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateGuild(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      try {
        const validatedData = GuildSchema.parse({ ...body, guildId: id });
        const guild = await ServiceGuild.upsertGuild(validatedData);
        return res.status(200).json(guild);
      } catch (validationError) {
        return res.status(400).json({ error: validationError.errors });
      }
    } catch (error) {
      console.error("Error updating guild:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGuild(req, res) {
    try {
      const { id } = req.params;
      const guild = await ServiceGuild.deleteGuild(id);
      return res.status(200).json(guild);
    } catch (error) {
      console.error("Error deleting guild:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ControllerGuild();
