const { z } = require("zod");

const ChannelSchema = z.object({
  channelId: z.string(),
  guildId: z.string(),
  name: z.string(),
  type: z.string(),
  category: z.string().optional().nullable(),
  action: z.string(),
});
