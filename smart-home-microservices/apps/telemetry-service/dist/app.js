"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const telemetryRoutes_1 = __importDefault(require("./routes/telemetryRoutes"));
const requireInternalService_1 = require("./middlewares/requireInternalService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.status(200).json({
        service: 'telemetry-service',
        status: 'ok'
    });
});
app.use('/telemetry', requireInternalService_1.requireInternalService, telemetryRoutes_1.default);
exports.default = app;
