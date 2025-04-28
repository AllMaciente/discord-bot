-- AlterTable
CREATE SEQUENCE guildconfig_id_seq;
ALTER TABLE "GuildConfig" ALTER COLUMN "id" SET DEFAULT nextval('guildconfig_id_seq');
ALTER SEQUENCE guildconfig_id_seq OWNED BY "GuildConfig"."id";
