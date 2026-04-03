"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = new TelemetryService();
