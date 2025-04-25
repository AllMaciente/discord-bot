import os

import discord
import requests
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()
intents = discord.Intents.all()

bot = commands.Bot(command_prefix="a!", intents=intents)


async def load_cogs():
    """
    Função para carregar os cogs do bot.
    """
    for filename in os.listdir("./cogs"):
        if filename.endswith(".py"):
            await bot.load_extension(f"cogs.{filename[:-3]}")
            print(f"Cog {filename} carregado com sucesso!")


@bot.command()
async def ola(ctx: commands.Context):
    user = ctx.author
    await ctx.reply(f"Olá {user.mention}, tudo bem?")


@bot.event
async def on_ready():
    print("Logged in as {0.user}".format(bot))
    await load_cogs()
    for guild in bot.guilds:
        print(f"Logged in to server: {guild.name} (ID: {guild.id})")
        url = f'{os.getenv("URL")}/guilds'
        if url:
            data = {"name": guild.name, "guildId": str(guild.id)}
            try:
                response = requests.post(url, json=data)
                print(
                    f"POST request sent to {url}, response status: {response.status_code}"
                )
            except requests.exceptions.RequestException as e:
                print(f"Failed to send POST request: {e}")
        else:
            print("POST_URL is not set in the .env file")


bot.run(os.getenv("TOKEN"))
