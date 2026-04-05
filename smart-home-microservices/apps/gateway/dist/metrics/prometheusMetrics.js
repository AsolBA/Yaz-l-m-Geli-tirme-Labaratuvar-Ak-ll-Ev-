"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsHandler = exports.metricsMiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register });
new prom_client_1.default.Gauge({
    name: 'gateway_instance_info',
    help: 'Scrape hedefi ayakta (her zaman 1)',
    labelNames: ['role'],
    registers: [register]
}).set({ role: 'api-gateway' }, 1);
const httpRequestDurationSeconds = new prom_client_1.default.Histogram({
    name: 'gateway_http_request_duration_seconds',
    help: 'Gateway HTTP request duration in seconds',
    labelNames: ['method', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    registers: [register]
});
const metricsMiddleware = (req, res, next) => {
    const start = process.hrtime.bigint();
    res.on('finish', () => {
        const durationNs = process.hrtime.bigint() - start;
        const seconds = Number(durationNs) / 1e9;
        httpRequestDurationSeconds.observe({ method: req.method, status_code: String(res.statusCode) }, seconds);
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
const metricsHandler = async (_req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
};
exports.metricsHandler = metricsHandler;
