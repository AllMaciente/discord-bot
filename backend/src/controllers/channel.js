const ServiceChannel = require("./../service/channel");
const { ChannelSchema } = require("./../schema/channel.schema");

class ControllerChannel {
  async getChannels(req, res) {
    try {
      const channels = await ServiceChannel.getChannels();
      return res.status(200).json(channels);
    } catch (error) {
      console.error("Error getting channels:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getChannelById(req, res) {
    try {
      const { id } = req.params;
      const channel = await ServiceChannel.getChannelById(id);
      return res.status(200).json(channel);
    } catch (error) {
      console.error("Error getting channel:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async getChannelByGuildId(req, res) {
    try {
      const { id, type } = req.params;
      const channel = await ServiceChannel.getChannelsByGuildId(id, type);
      return res.status(200).json(channel);
    } catch (error) {
      console.error("Error getting channel:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async syncChannel(req, res) {
    try {
      const { body } = req;
      const { action, ...data } = body;
      switch (body.action) {
        case "create":
          const createdChannel = await ServiceChannel.createChannel(data);
          return res.status(200).json(createdChannel);

        case "update":
          const updatedChannel = await ServiceChannel.updateChannel(
            body.channelId,
            data
          );
          return res.status(200).json(updatedChannel);

        case "delete":
          const deletedChannel = await ServiceChannel.deleteChannel(
            body.channelId
          );
          return res.status(200).json(deletedChannel);

        default:
          return res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
      console.error("Error syncing channel:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new ControllerChannel();
