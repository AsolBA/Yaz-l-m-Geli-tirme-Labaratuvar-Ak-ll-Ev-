"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = __importDefault(require("../models/Device"));
class DeviceService {
    async getAll() {
        return await Device_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return await Device_1.default.findById(id);
    }
    async create(deviceData) {
        return await Device_1.default.create(deviceData);
    }
    async update(id, updateData) {
        return await Device_1.default.findByIdAndUpdate(id, updateData, { new: true });
    }
    async executeCommand(id, command, value) {
        const device = await Device_1.default.findById(id);
        if (!device) {
            return null;
        }
        switch (command) {
            case 'TURN_ON':
                device.status = 'on';
                break;
            case 'TURN_OFF':
                device.status = 'off';
                break;
            case 'SET_BRIGHTNESS':
                if (device.type !== 'light' || typeof value !== 'number') {
                    return null;
                }
                device.brightness = value;
                device.status = value > 0 ? 'on' : 'off';
                break;
            case 'SET_TEMPERATURE':
                if (device.type !== 'thermostat' || typeof value !== 'number') {
                    return null;
                }
                device.targetTemperature = value;
                device.status = 'on';
                break;
            case 'LOCK':
                if (device.type !== 'lock') {
                    return null;
                }
                device.locked = true;
                device.status = 'on';
                break;
            case 'UNLOCK':
                if (device.type !== 'lock') {
                    return null;
                }
                device.locked = false;
                device.status = 'off';
                break;
            default:
                return null;
        }
        await device.save();
        return device;
    }
}
exports.default = new DeviceService();
