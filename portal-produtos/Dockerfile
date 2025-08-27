# Etapa 1: Build do frontend (React + Vite) com Node 22.18
FROM node:22.18.0 AS build
WORKDIR /app

# Copia os manifests e instala dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código e gera o build
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa config customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build do React (dist) para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
