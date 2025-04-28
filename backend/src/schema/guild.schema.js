const { z } = require("zod");

const GuildSchema = z.object({
  guildId: z.string(),
  name: z.string().optional(),
  icon: z.string().optional(),
  ownerId: z.string().optional(),
});

module.exports = { GuildSchema };
