"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Telemetry_1 = __importDefault(require("../models/Telemetry"));
class TelemetryService {
    async getAll() {
        return await Telemetry_1.default.find().sort({ createdAt: -1 });
    }
    async getById(id) {
        return await Telemetry_1.default.findById(id);
    }
    async getByDeviceId(deviceId) {
        return await Telemetry_1.default.find({ deviceId }).sort({ createdAt: -1 });
    }
    async getLatestByDeviceId(deviceId) {
        return await Telemetry_1.default.findOne({ deviceId }).sort({ createdAt: -1 });
    }
    async create(data) {
        return await Telemetry_1.default.create(data);
    }
    async replaceById(id, data) {
        if (!mongoose_1.default.isValidObjectId(id)) {
            return 'invalid_id';
        }
        const updated = await Telemetry_1.default.findByIdAndUpdate(id, {
            deviceId: data.deviceId,
            temperature: data.temperature,
            humidity: data.humidity,
            energyUsage: data.energyUsage,
            motionDetected: data.motionDetected
        }, { new: true, runValidators: true });
        if (!updated) {
            return 'not_found';
        }
        return updated;
    }
    async deleteById(id) {
        if (!mongoose_1.default.isValidObjectId(id)) {
            return 'invalid';
        }
        const deleted = await Telemetry_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return 'not_found';
        }
        return 'ok';
    }
}
exports.default = new TelemetryService();
