"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proxyRoutes_1 = __importDefault(require("./routes/proxyRoutes"));
const authProxyRoutes_1 = __importDefault(require("./routes/authProxyRoutes"));
const prometheusMetrics_1 = require("./metrics/prometheusMetrics");
const accessLogToFile_1 = require("./logging/accessLogToFile");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(accessLogToFile_1.accessLogToFile);
app.use(prometheusMetrics_1.metricsMiddleware);
app.get('/metrics', prometheusMetrics_1.metricsHandler);
app.get('/health', (_req, res) => {
    res.status(200).json({
        service: 'gateway',
        status: 'ok'
    });
});
app.use('/api/auth', authProxyRoutes_1.default);
app.use('/api', proxyRoutes_1.default);
exports.default = app;
