"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const axios_1 = __importDefault(require("axios"));
const internalToken_1 = require("../internalToken");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/validate', { token }, {
            headers: {
                ...(0, internalToken_1.internalServiceHeaders)(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.data.valid) {
            res.status(401).json({
                error: true,
                message: 'Invalid token'
            });
            return;
        }
        req.user = response.data;
        next();
    }
    catch {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    }
};
exports.authMiddleware = authMiddleware;
