FROM python:3.12-slim

WORKDIR /app

# Copiar os arquivos de dependência
COPY requirements.txt /app/

# Instalar as dependências globalmente (sem poetry)
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante do projeto
COPY . /app

# Rodar o bot (ajuste o caminho se necessário)
CMD ["python", "main.py"]
