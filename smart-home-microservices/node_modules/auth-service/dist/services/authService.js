"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
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
        this.sessions = new Map();
    }
    login(username, password) {
        const user = this.users.find((u) => u.username === username && u.password === password);
        if (!user) {
            return null;
        }
        const token = crypto_1.default.randomUUID();
        this.sessions.set(token, {
            userId: user.id,
            username: user.username,
            role: user.role
        });
        return {
            token,
            role: user.role
        };
    }
    validate(token) {
        const session = this.sessions.get(token);
        if (!session) {
            return null;
        }
        return {
            valid: true,
            userId: session.userId,
            username: session.username,
            role: session.role
        };
    }
    logout(token) {
        return this.sessions.delete(token);
    }
}
exports.default = new AuthService();
