"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireInternalService = void 0;
const HEADER = 'x-internal-token';
const requireInternalService = (req, res, next) => {
    const expected = process.env.INTERNAL_SERVICE_TOKEN;
    if (!expected?.trim()) {
        res.status(500).json({
            error: true,
            message: 'Server misconfiguration: INTERNAL_SERVICE_TOKEN'
        });
        return;
    }
    const token = req.headers[HEADER];
    const value = Array.isArray(token) ? token[0] : token;
    if (value !== expected) {
        res.status(403).json({
            error: true,
            message: 'Forbidden: use the API gateway'
        });
        return;
    }
    next();
};
exports.requireInternalService = requireInternalService;
