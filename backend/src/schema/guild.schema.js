const { z } = require("zod");

const GuildSchema = z.object({
  guildId: z.string(),
  name: z.string().optional(),
  modChannel: z.string().optional(),
  voiceCategory: z.string().optional(),
  voiceLobby: z.string().optional(),
  nbaChannel: z.string().optional(),
});

module.exports = { GuildSchema };
