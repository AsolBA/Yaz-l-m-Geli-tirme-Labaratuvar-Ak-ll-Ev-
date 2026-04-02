FROM node:18

WORKDIR /app

# ROOT tsconfig'i kopyala
COPY tsconfig.base.json ./

# package.json
COPY package*.json ./
RUN npm install

# app kodları
COPY apps/telemetry-service ./apps/telemetry-service

WORKDIR /app/apps/telemetry-service

RUN npm install

CMD ["npm", "run", "dev"]