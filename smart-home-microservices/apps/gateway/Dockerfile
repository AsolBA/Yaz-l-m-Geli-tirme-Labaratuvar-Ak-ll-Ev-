FROM node:18

WORKDIR /app

# ROOT tsconfig'i kopyala
COPY tsconfig.base.json ./

# package.json
COPY package*.json ./
RUN npm install

# app kodları
COPY apps/gateway ./apps/gateway

WORKDIR /app/apps/gateway

RUN npm install

CMD ["npm", "run", "dev"]