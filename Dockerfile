FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app

# Installa solo le dipendenze
COPY package*.json ./
RUN npm install

# Copia il codice
COPY . .

EXPOSE 8080
CMD ["npm", "start"]