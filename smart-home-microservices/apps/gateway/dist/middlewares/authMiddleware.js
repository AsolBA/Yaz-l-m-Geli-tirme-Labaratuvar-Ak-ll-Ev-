"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const HttpAuthTokenValidator_1 = require("../security/HttpAuthTokenValidator");
const tokenValidator = new HttpAuthTokenValidator_1.HttpAuthTokenValidator();
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
    const outcome = await tokenValidator.validateBearerToken(token);
    if (outcome.status === 'invalid') {
        res.status(401).json({
            error: true,
            message: 'Invalid token'
        });
        return;
    }
    if (outcome.status === 'unreachable') {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
        return;
    }
    req.user = outcome.user;
    next();
};
exports.authMiddleware = authMiddleware;
