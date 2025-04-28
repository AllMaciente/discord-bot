import datetime
import os

import discord
import pytz
import requests
from discord.ext import commands, tasks
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()
dt = datetime.datetime.now(tz=pytz.timezone("America/Sao_Paulo"))
fuso_horario = dt.tzinfo


class SyncInformationBack(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.api_base_url = os.getenv("URL")  # URL base da API
        self.sync_task.start()  # Inicia a tarefa agendada

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

    def syncMembersForBackend(self, member, action):
        payload = {
            "memberId": str(member.id),
            "name": member.name,
            "displayName": member.display_name,
            "avatar": member.avatar.url if member.avatar else None,
            "bot": member.bot,
        }
        try:
            api_url = f"{self.api_base_url}/members/"
            response = requests.post(api_url, json=payload)
            print(
                f"o Membro {member.name} foi {action} : status {response.status_code}"
            )
        except Exception as e:
            print(f"Erro ao enviar membro: {e}")

    async def syncAllChannels(self):
        for guild in self.bot.guilds:
            for channel in guild.channels:
                self.syncChannelsForBackend(channel, "update")

    async def syncAllMembers(self):
        for guild in self.bot.guilds:
            for member in guild.members:
                self.syncMembersForBackend(member, "update")

    async def syncGuildsBack(self):
        for guild in self.bot.guilds:
            print(f"Logged in to server: {guild.name} (ID: {guild.id})")
            url = f"{self.api_base_url}/guilds"
            if url:
                data = {
                    "name": guild.name,
                    "guildId": str(guild.id),
                    "ownerId": str(guild.owner_id),
                    "icon": guild.icon.url if guild.icon else None,
                }
                try:
                    response = requests.post(url, json=data)
                    print(
                        f"POST request sent to {url}, response status: {response.status_code}"
                    )
                except requests.exceptions.RequestException as e:
                    print(f"Failed to send POST request: {e}")
            else:
                print("POST_URL is not set in the .env file")

    async def syncAll(self):
        await self.syncAllMembers()
        await self.syncGuildsBack()
        await self.syncAllChannels()

    @commands.Cog.listener()
    async def on_ready(self):
        print("Bot está pronto. Sincronizando informações...")
        await self.syncAll()
        print("Sincronização inicial concluída.")
        if not self.sync_task.is_running():
            self.sync_task.start()  # Garante que a tarefa agendada está rodando

    @commands.Cog.listener()
    async def on_guild_channel_create(self, channel):
        self.syncChannelsForBackend(channel, "create")

    @commands.Cog.listener()
    async def on_guild_channel_delete(self, channel):
        self.syncChannelsForBackend(channel, "delete")

    @commands.Cog.listener()
    async def on_guild_channel_update(self, before, after):
        self.syncChannelsForBackend(after, "update")

    @commands.Cog.listener()
    async def on_member_join(self, member):
        self.syncMembersForBackend(member, "create")

    @commands.Cog.listener()
    async def on_member_remove(self, member):
        self.syncMembersForBackend(member, "delete")

    @commands.Cog.listener()
    async def on_member_update(self, before, after):
        self.syncMembersForBackend(after, "update")

    @tasks.loop(time=datetime.time(5, 0, tzinfo=fuso_horario))
    async def sync_task(self):
        print("Sincronizando informações diariamente às 5h...")
        await self.syncAll()
        print("Sincronização diária concluída.")


async def setup(bot):
    await bot.add_cog(SyncInformationBack(bot))
