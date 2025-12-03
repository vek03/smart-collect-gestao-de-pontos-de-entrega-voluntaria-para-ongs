FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# garante que a pasta exista para uploads
RUN mkdir -p uploads

EXPOSE 3001

CMD ["node", "index.js"]
