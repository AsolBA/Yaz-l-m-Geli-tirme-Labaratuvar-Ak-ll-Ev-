"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const redis_1 = require("../config/redis");
class AuthService {
    constructor() {
        this.users = [
            {
                id: '1',
                username: 'admin1',
                password: '123456',
                role: 'admin'
            },
            {
                id: '2',
                username: 'resident1',
                password: '123456',
                role: 'resident'
            },
            {
                id: '3',
                username: 'viewer1',
                password: '123456',
                role: 'viewer'
            }
        ];
    }
    async login(username, password) {
        const user = this.users.find((u) => u.username === username && u.password === password);
        if (!user) {
            return null;
        }
        const token = crypto_1.default.randomUUID();
        const sessionData = {
            userId: user.id,
            username: user.username,
            role: user.role
        };
        await redis_1.redisClient.set(`session:${token}`, JSON.stringify(sessionData), {
            EX: 3600
        });
        return {
            token,
            role: user.role
        };
    }
    async validate(token) {
        const session = await redis_1.redisClient.get(`session:${token}`);
        if (!session) {
            return null;
        }
        const parsedSession = JSON.parse(session);
        return {
            valid: true,
            userId: parsedSession.userId,
            username: parsedSession.username,
            role: parsedSession.role
        };
    }
    async logout(token) {
        const deletedCount = await redis_1.redisClient.del(`session:${token}`);
        return deletedCount > 0;
    }
}
exports.default = new AuthService();
