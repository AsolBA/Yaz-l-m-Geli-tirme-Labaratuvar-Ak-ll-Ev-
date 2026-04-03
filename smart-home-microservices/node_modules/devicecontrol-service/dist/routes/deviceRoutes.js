"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceService_1 = __importDefault(require("../services/deviceService"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const devices = await deviceService_1.default.getAll();
    res.status(200).json({
        error: false,
        data: devices
    });
});
router.get('/:id', async (req, res) => {
    const id = String(req.params.id);
    const device = await deviceService_1.default.getById(id);
    if (!device) {
        res.status(404).json({
            error: true,
            message: 'Device not found'
        });
        return;
    }
    res.status(200).json({
        error: false,
        data: device
    });
});
router.post('/', async (req, res) => {
    const { name, type, status, brightness, targetTemperature, locked } = req.body;
    if (!name || !type || !status) {
        res.status(400).json({
            error: true,
            message: 'name, type and status are required'
        });
        return;
    }
    const newDevice = await deviceService_1.default.create({
        name,
        type,
        status,
        brightness,
        targetTemperature,
        locked
    });
    res.status(201).json({
        error: false,
        data: newDevice
    });
});
router.put('/:id', async (req, res) => {
    const id = String(req.params.id);
    const updatedDevice = await deviceService_1.default.update(id, req.body);
    if (!updatedDevice) {
        res.status(404).json({
            error: true,
            message: 'Device not found'
        });
        return;
    }
    res.status(200).json({
        error: false,
        data: updatedDevice
    });
});
router.post('/:id/commands', async (req, res) => {
    const id = String(req.params.id);
    const { command, value } = req.body;
    if (!command) {
        res.status(400).json({
            error: true,
            message: 'command is required'
        });
        return;
    }
    const updatedDevice = await deviceService_1.default.executeCommand(id, command, value);
    if (!updatedDevice) {
        res.status(400).json({
            error: true,
            message: 'Invalid command or device not found'
        });
        return;
    }
    res.status(200).json({
        error: false,
        message: 'Command executed successfully',
        data: updatedDevice
    });
});
exports.default = router;
