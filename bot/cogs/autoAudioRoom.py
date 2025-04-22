import os

import discord
import requests
from discord.ext import commands
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()


class AutoAudioRoom(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.user_channels = {}  # Dicionário para rastrear canais criados para usuários
        self.api_base_url = os.getenv("URL")  # URL base da API

    def get_guild_data(self, guild_id):
        """
        Faz uma requisição à API para obter os dados da guild.
        """
        api_url = f"{self.api_base_url}/guilds/{guild_id}"  # Constrói a URL completa
        response = requests.get(api_url)
        if response.status_code == 200:
            return response.json()  # Retorna os dados da guild como um dicionário
        return None

    @commands.Cog.listener()
    async def on_voice_state_update(self, member, before, after):
        guild = member.guild

        # Obtém os dados da guild da API
        guild_data = self.get_guild_data(guild.id)
        if not guild_data:
            return  # Não faz nada se os dados da guild não forem encontrados

        voice_lobby_id = guild_data.get("voiceLobby")
        voice_category_id = guild_data.get("voiceCategory")

        # Ignora a funcionalidade se 'voiceLobby' não estiver configurado
        if not voice_lobby_id:
            return

        # Verifica se o usuário entrou no canal 'voiceLobby'
        if after.channel and after.channel.id == int(voice_lobby_id):
            # Obtém a categoria onde o canal será criado (se configurada)
            category = (
                guild.get_channel(int(voice_category_id)) if voice_category_id else None
            )

            # Cria um canal de voz personalizado para o usuário
            overwrites = {
                guild.default_role: discord.PermissionOverwrite(connect=False),
                member: discord.PermissionOverwrite(connect=True),
            }
            custom_channel = await guild.create_voice_channel(
                name=f"│🔊] Sala de {member.display_name}",
                overwrites=overwrites,
                category=category,
            )
            self.user_channels[custom_channel.id] = {
                "owner": member.id,
                "channel": custom_channel,
            }

            # Move o usuário para o canal personalizado
            await member.move_to(custom_channel)

        # Verifica se o usuário saiu de um canal de voz
        if before.channel and before.channel.id in self.user_channels:
            custom_channel_data = self.user_channels[before.channel.id]
            custom_channel = custom_channel_data["channel"]

            # Verifica se o canal está vazio
            if len(custom_channel.members) == 0:
                await custom_channel.delete()
                del self.user_channels[before.channel.id]


async def setup(bot):
    await bot.add_cog(AutoAudioRoom(bot))
