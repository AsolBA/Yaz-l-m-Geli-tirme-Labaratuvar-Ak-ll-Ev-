"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
const internalProxyOpts = {
    proxyReqOptDecorator: (proxyReqOpts) => {
        proxyReqOpts.headers = { ...proxyReqOpts.headers };
        const h = proxyReqOpts.headers;
        const token = process.env.INTERNAL_SERVICE_TOKEN;
        if (!token?.trim()) {
            throw new Error('INTERNAL_SERVICE_TOKEN is required');
        }
        h['X-Internal-Token'] = token;
        return proxyReqOpts;
    }
};
const telemetryPath = (req) => {
    const path = req.originalUrl.replace('/api/telemetry', '');
    return `/telemetry${path || ''}`;
};
router.put('/telemetry/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), (0, express_http_proxy_1.default)('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => `/telemetry/${req.params.id}`
}));
router.delete('/telemetry/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), (0, express_http_proxy_1.default)('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => `/telemetry/${req.params.id}`
}));
router.use('/telemetry', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin', 'resident', 'viewer'), (0, express_http_proxy_1.default)('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: telemetryPath
}));
router.get('/devices', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin', 'resident', 'viewer'), (0, express_http_proxy_1.default)('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: () => '/devices'
}));
router.get('/devices/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin', 'resident', 'viewer'), (0, express_http_proxy_1.default)('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => {
        return `/devices/${req.params.id}`;
    }
}));
router.post('/devices', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), (0, express_http_proxy_1.default)('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: () => '/devices'
}));
router.put('/devices/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin'), (0, express_http_proxy_1.default)('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => {
        return `/devices/${req.params.id}`;
    }
}));
router.post('/devices/:id/commands', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin', 'resident'), (0, express_http_proxy_1.default)('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => {
        return `/devices/${req.params.id}/commands`;
    }
}));
router.use('/telemetry-unavailable', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)('admin', 'resident', 'viewer'), (0, express_http_proxy_1.default)('http://127.0.0.1:3999', {
    ...internalProxyOpts,
    proxyReqPathResolver: () => '/health',
    proxyErrorHandler: (_err, res) => {
        res.status(502).json({
            error: true,
            message: 'Bad Gateway'
        });
    }
}));
exports.default = router;
