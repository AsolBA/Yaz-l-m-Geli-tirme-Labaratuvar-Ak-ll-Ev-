"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const redis_1 = require("./config/redis");
const db_1 = require("./config/db");
const seedUsers_1 = require("./services/seedUsers");
const PORT = process.env.PORT || 3001;
const startServer = async () => {
    await (0, db_1.connectDB)();
    await (0, seedUsers_1.seedUsersIfEmpty)();
    await (0, redis_1.connectRedis)();
    app_1.default.listen(PORT, () => {
        console.log(`Auth service running on port ${PORT}`);
    });
};
startServer();
