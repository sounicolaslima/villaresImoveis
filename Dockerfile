@"
FROM node:18-alpine

WORKDIR /app

# Copiar package.json da pasta backend
COPY backend/package*.json ./

RUN npm install

# Copiar TODO o backend mantendo a estrutura
COPY backend/ ./backend/

# Copiar outras pastas necessárias
COPY public/ ./public/
COPY templates/ ./templates/

# Mudar para o diretório do backend
WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]
"@ | Out-File -FilePath Dockerfile -Encoding utf8 -Force
