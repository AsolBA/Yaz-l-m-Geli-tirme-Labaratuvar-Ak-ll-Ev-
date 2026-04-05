"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const accessLogToFile = (req, res, next) => {
    const dir = process.env.ACCESS_LOG_DIR?.trim();
    if (!dir) {
        next();
        return;
    }
    const started = Date.now();
    res.on('finish', () => {
        const line = JSON.stringify({
            ts: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            durationMs: Date.now() - started
        }) + '\n';
        const file = path_1.default.join(dir, 'gateway-access.log');
        fs_1.default.mkdir(dir, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                return;
            }
            fs_1.default.appendFile(file, line, () => { });
        });
    });
    next();
};
exports.accessLogToFile = accessLogToFile;
