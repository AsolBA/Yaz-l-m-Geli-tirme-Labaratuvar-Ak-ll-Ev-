"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const redis_1 = require("../config/redis");
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    async register(username, password, role) {
        const validRoles = ['admin', 'resident', 'viewer'];
        if (!validRoles.includes(role)) {
            return { error: 'Invalid role' };
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        try {
            const created = await User_1.default.create({
                username,
                passwordHash,
                role
            });
            return {
                id: String(created._id),
                username: created.username,
                role: created.role
            };
        }
        catch {
            return { error: 'User already exists' };
        }
    }
    async login(username, password) {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return null;
        }
        const match = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!match) {
            return null;
        }
        const token = crypto_1.default.randomUUID();
        const sessionData = {
            userId: String(user._id),
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
