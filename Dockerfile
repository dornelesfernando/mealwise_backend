# Estágio 1: Build (Ambiente de Construção)
FROM node:24 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia as dependências e instala
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte
COPY . .

# Se houver um processo de build (como transpilação de TypeScript)
# Rodar aqui: RUN npm run build
# Exemplo, se o script for 'build' no package.json
RUN npm run build

# Estágio 2: Produção (Imagem Final Leve)
FROM node:24-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas as dependências de produção
COPY --from=builder /app/dist ./dist 
COPY package*.json ./
RUN npm install --omit=dev # Instala apenas dependências de produção

# Comando de produção (o script 'start' deve ser configurado no package.json)
CMD ["npm", "start"]