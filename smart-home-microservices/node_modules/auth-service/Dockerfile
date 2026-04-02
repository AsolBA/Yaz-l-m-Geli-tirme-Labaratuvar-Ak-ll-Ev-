FROM node:18

WORKDIR /app

# ROOT tsconfig'i kopyala
COPY tsconfig.base.json ./

# package.json
COPY package*.json ./
RUN npm install

# app kodları
COPY apps/auth-service ./apps/auth-service

WORKDIR /app/apps/auth-service

RUN npm install

CMD ["npm", "run", "dev"]