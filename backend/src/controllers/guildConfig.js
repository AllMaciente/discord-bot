const ServiceGuildConfig = require("./../service/guildConfig");

class ControllerGuildConfig {
  async getGuildConfig(req, res) {
    try {
      const { guildId, key } = req.params;
      const guildConfig = await ServiceGuildConfig.getGuildConfig(guildId, key);
      return res.status(200).json(guildConfig);
    } catch (error) {
      console.error("Error getting guild config:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getGuildConfigs(req, res) {
    try {
      const { guildId } = req.params;
      const guildConfigs = await ServiceGuildConfig.getGuildConfigs(guildId);
      return res.status(200).json(guildConfigs);
    } catch (error) {
      console.error("Error getting guild configs:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async upsertGuildConfig(req, res) {
    try {
      const { body } = req;
      const guildConfig = await ServiceGuildConfig.upsertGuildConfig(body);
      return res.status(200).json(guildConfig);
    } catch (error) {
      console.error("Error creating/updating guild config:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGuildConfig(req, res) {
    try {
      const { guildId, key } = req.params;
      const guildConfig = await ServiceGuildConfig.deleteGuildConfig(
        guildId,
        key
      );
      return res.status(200).json(guildConfig);
    } catch (error) {
      console.error("Error deleting guild config:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ControllerGuildConfig();
