import os

import discord
import requests
from discord.ext import commands
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()


class SyncChannelsBack(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.api_base_url = os.getenv("URL")  # URL base da API

    def syncChannelsForBackend(self, channel, action):
        payload = {
            "channelId": str(channel.id),
            "guildId": str(channel.guild.id),
            "name": channel.name,
            "type": str(channel.type),
            "category": (
                None
                if channel.type == discord.ChannelType.category
                else (channel.category.name if channel.category else None)
            ),
            "action": action,
        }
        try:
            api_url = f"{self.api_base_url}/channels/"
            response = requests.post(api_url, json=payload)
            print(
                f"o Canal {channel.name} foi {action} : status {response.status_code}"
            )
        except Exception as e:
            print(f"Erro ao enviar canal: {e}")

    @commands.Cog.listener()
    async def on_guild_channel_create(self, channel):
        self.syncChannelsForBackend(channel, "create")

    @commands.Cog.listener()
    async def on_guild_channel_delete(self, channel):
        self.syncChannelsForBackend(channel, "delete")

    @commands.Cog.listener()
    async def on_guild_channel_update(self, before, after):
        self.syncChannelsForBackend(after, "update")

    @commands.command(name="sync_channels")
    async def sync_channels(self, ctx, type: str = None):
        if type is None:
            type = "update"

        guild = ctx.guild
        for channel in guild.channels:
            self.syncChannelsForBackend(channel, type)
        if ctx.author.guild_permissions.administrator:
            await ctx.reply("Canais sincronizados com sucesso!", ephemeral=True)
        else:
            await ctx.reply(
                "Você não tem permissão para executar este comando.", ephemeral=True
            )


async def setup(bot):
    await bot.add_cog(SyncChannelsBack(bot))
