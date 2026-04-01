FROM node:18

WORKDIR /app

# ROOT tsconfig'i kopyala
COPY tsconfig.base.json ./

# package.json
COPY package*.json ./
RUN npm install

# app kodları
COPY apps/devicecontrol-service ./apps/devicecontrol-service

WORKDIR /app/apps/devicecontrol-service

RUN npm install

CMD ["npm", "run", "dev"]