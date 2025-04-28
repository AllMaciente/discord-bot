import os

import discord
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


@bot.command()
@commands.is_owner()
async def sync(ctx: commands.Context):
    """
    Comando para sincronizar os slash commands do bot.
    """
    synced = await bot.tree.sync()
    await ctx.reply(f"Sincronizado {len(synced)} comandos de barra com sucesso!")


# Carrega os cogs antes de iniciar o bot
async def main():
    async with bot:
        await load_cogs()
        await bot.start(os.getenv("TOKEN"))


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
