"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const telemetryService_1 = __importDefault(require("../services/telemetryService"));
const router = (0, express_1.Router)();
router.get('/device/:deviceId/latest', async (req, res) => {
    const deviceId = String(req.params.deviceId);
    const record = await telemetryService_1.default.getLatestByDeviceId(deviceId);
    if (!record) {
        res.status(404).json({
            error: true,
            message: 'No telemetry data found for this device'
        });
        return;
    }
    res.status(200).json({
        error: false,
        data: record
    });
});
router.get('/device/:deviceId', async (req, res) => {
    const deviceId = String(req.params.deviceId);
    const records = await telemetryService_1.default.getByDeviceId(deviceId);
    res.status(200).json({
        error: false,
        data: records
    });
});
router.get('/:id', async (req, res) => {
    const id = String(req.params.id);
    const record = await telemetryService_1.default.getById(id);
    if (!record) {
        res.status(404).json({
            error: true,
            message: 'Telemetry record not found'
        });
        return;
    }
    res.status(200).json({
        error: false,
        data: record
    });
});
router.get('/', async (_req, res) => {
    const records = await telemetryService_1.default.getAll();
    res.status(200).json({
        error: false,
        data: records
    });
});
router.post('/', async (req, res) => {
    const { deviceId, temperature, humidity, energyUsage, motionDetected } = req.body;
    if (!deviceId ||
        temperature === undefined ||
        humidity === undefined ||
        energyUsage === undefined ||
        motionDetected === undefined) {
        res.status(400).json({
            error: true,
            message: 'deviceId, temperature, humidity, energyUsage and motionDetected are required'
        });
        return;
    }
    const newRecord = await telemetryService_1.default.create({
        deviceId,
        temperature,
        humidity,
        energyUsage,
        motionDetected
    });
    res.status(201).json({
        error: false,
        data: newRecord
    });
});
exports.default = router;
