# Discord Bot Project

Este projeto contém três serviços:

- `db`: Banco de dados PostgreSQL
- `backend`: API que interage com o banco de dados
- `bot`: Bot do Discord que usa o backend

---

## 📦 Instalação

### Requisitos

- Docker
- Docker Compose (ou Portainer)

---

## 📄 Arquivos `.env` necessários

Você precisa criar apenas **um arquivo `.env`** na raiz do projeto (ou configurar as variáveis diretamente no Portainer).

Arquivo `.env` (usado pelo serviço `bot`):

```env
TOKEN=seu_token_do_discord_aqui
```

| Variável | Descrição                   |
| -------- | --------------------------- |
| TOKEN    | Token do seu bot do Discord |

## 🐳 Docker Compose

Aqui está o conteúdo do `docker-compose.yml`:

```
version: "3.8"

services:
  db:
    image: postgres:16-alpine
    container_name: postgres-bot
    environment:
      POSTGRES_USER: discordbot
      POSTGRES_PASSWORD: discordbot
      POSTGRES_DB: discordbot
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  backend:
    image: allan/discord-backend-bot:latest
    container_name: backend-bot
    environment:
      DATABASE_URL: postgres://discordbot:discordbot@db:5432/discordbot?schema=public
    depends_on:
      - db
    ports:
      - "3000:3000"
    restart: unless-stopped

  bot:
    image: allan/discord-bot:latest
    container_name: bot
    environment:
      URL: http://backend:3000
      TOKEN: ${TOKEN}
    depends_on:
      - db
      - backend
    env_file:
      - .env
    restart: unless-stopped

volumes:
  postgres_data:
```

## 🚀 Subindo o projeto

### Via Docker Compose

    Certifique-se que seu .env está criado conforme mostrado acima.

    Execute:

`docker compose up -d`

Pronto! O banco, o backend e o bot estarão funcionando.

### Via Portainer (Stack)

    Acesse seu Portainer.

    Vá em Stacks > Add Stack.

    Cole o conteúdo acima (docker-compose.yml) na área de edição.

    Adicione a variável TOKEN no campo Environment variables ou crie o arquivo .env.

    Clique em Deploy the Stack.

## 📤 Docker Hub

As imagens já estão publicadas:

    Backend: allan/discord-backend-bot

    Bot: allan/discord-bot

Para atualizar suas imagens:

```bash
docker compose pull
docker compose up -d
```

## 📑 Notas Importantes

    O backend automaticamente roda as migrations do Prisma ao iniciar.

    O bot começa a funcionar assim que o backend estiver online e o token do Discord for válido.

    Banco de dados exposto apenas em ambiente local. Para produção, recomenda-se usar variáveis secrets e redes privadas.
