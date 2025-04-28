import os

import discord
import requests
from discord import app_commands
from discord.ext import commands


class ConfigCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(
        name="config", description="Comando base para configurar o servidor."
    )
    async def config(self, interaction: discord.Interaction):
        # Obtém a URL base da API a partir da variável de ambiente
        api_base_url = os.getenv("URL")
        guild_id = str(interaction.guild.id)

        # Fazendo a requisição para obter as configurações do servidor
        response = requests.get(f"{api_base_url}/guilds/config/{guild_id}")
        if response.status_code != 200:
            await interaction.response.send_message(
                "Erro ao buscar configurações do servidor.", ephemeral=True
            )
            return
        configs = response.json()

        # Criando as opções do menu suspenso com base nas configurações
        options = [
            discord.SelectOption(
                label=config["key"],
                description=f"Tipo: {config['type']}",
                value=config["key"],
            )
            for config in configs
        ]

        # Verifica se há configurações disponíveis
        if not options:
            await interaction.response.send_message(
                "Nenhuma configuração disponível para este servidor.", ephemeral=True
            )
            return

        # Envia o menu suspenso para o usuário
        view = ConfigDropdownView(options, api_base_url, guild_id, interaction.guild)
        await interaction.response.send_message(
            "Escolha a configuração que deseja alterar:", view=view, ephemeral=True
        )


class ConfigDropdownView(discord.ui.View):
    def __init__(self, options, api_base_url, guild_id, guild):
        super().__init__()
        self.add_item(ConfigDropdown(options, api_base_url, guild_id, guild))


class ConfigDropdown(discord.ui.Select):
    def __init__(self, options, api_base_url, guild_id, guild):
        super().__init__(placeholder="Selecione uma configuração...", options=options)
        self.api_base_url = api_base_url
        self.guild_id = guild_id
        self.guild = guild

    async def callback(self, interaction: discord.Interaction):
        selected_key = self.values[0]

        # Fazendo a requisição para obter detalhes da configuração selecionada
        response = requests.get(
            f"{self.api_base_url}/guilds/config/{self.guild_id}/{selected_key}"
        )
        if response.status_code != 200:
            await interaction.response.send_message(
                "Erro ao buscar detalhes da configuração.", ephemeral=True
            )
            return
        config_detail = response.json()

        # Determina o tipo de entrada com base no tipo da configuração
        config_type = config_detail.get("type")
        if config_type == "text":
            options = [
                discord.SelectOption(label=channel.name, value=str(channel.id))
                for channel in self.guild.text_channels
            ]
        elif config_type == "voice":
            options = [
                discord.SelectOption(label=channel.name, value=str(channel.id))
                for channel in self.guild.voice_channels
            ]
        elif config_type == "category":
            options = [
                discord.SelectOption(label=category.name, value=str(category.id))
                for category in self.guild.categories
            ]
        else:  # Tipo `null`
            await interaction.response.send_modal(
                ConfigModal(
                    self.api_base_url,
                    self.guild_id,
                    selected_key,
                    "Digite o valor desejado",
                )
            )
            return

        # Envia um menu suspenso para o usuário selecionar o valor
        view = ValueDropdownView(
            self.api_base_url, self.guild_id, selected_key, options
        )
        await interaction.response.send_message(
            "Selecione o valor desejado:", view=view, ephemeral=True
        )


class ValueDropdownView(discord.ui.View):
    def __init__(self, api_base_url, guild_id, key, options):
        super().__init__()
        self.add_item(ValueDropdown(api_base_url, guild_id, key, options))


class ValueDropdown(discord.ui.Select):
    def __init__(self, api_base_url, guild_id, key, options):
        super().__init__(placeholder="Selecione um valor...", options=options)
        self.api_base_url = api_base_url
        self.guild_id = guild_id
        self.key = key

    async def callback(self, interaction: discord.Interaction):
        selected_value = self.values[0]

        # Fazendo a requisição para atualizar a configuração
        payload = {"guildId": self.guild_id, "key": self.key, "value": selected_value}
        response = requests.post(f"{self.api_base_url}/guilds/config/", json=payload)
        if response.status_code != 200:
            await interaction.response.send_message(
                "Erro ao atualizar a configuração.", ephemeral=True
            )
            return

        await interaction.response.send_message(
            "Configuração atualizada com sucesso!", ephemeral=True
        )


class ConfigModal(discord.ui.Modal, title="Alterar Configuração"):
    def __init__(self, api_base_url, guild_id, key, placeholder):
        super().__init__()
        self.api_base_url = api_base_url
        self.guild_id = guild_id
        self.key = key

        # Campo para o valor da configuração
        self.value_input = discord.ui.TextInput(
            label="Novo valor", placeholder=placeholder, required=True
        )
        self.add_item(self.value_input)

    async def on_submit(self, interaction: discord.Interaction):
        # Fazendo a requisição para atualizar a configuração
        payload = {
            "guildId": self.guild_id,
            "key": self.key,
            "value": self.value_input.value,
        }
        response = requests.post(f"{self.api_base_url}/guilds/config/", json=payload)
        if response.status_code != 200:
            await interaction.response.send_message(
                "Erro ao atualizar a configuração.", ephemeral=True
            )
            return

        await interaction.response.send_message(
            "Configuração atualizada com sucesso!", ephemeral=True
        )


async def setup(bot: commands.Bot):
    await bot.add_cog(ConfigCommands(bot))
