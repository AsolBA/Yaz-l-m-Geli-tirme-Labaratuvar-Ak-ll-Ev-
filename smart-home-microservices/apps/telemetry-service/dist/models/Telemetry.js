"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const telemetrySchema = new mongoose_1.default.Schema({
    deviceId: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    energyUsage: { type: Number, required: true },
    motionDetected: { type: Boolean, required: true }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Telemetry', telemetrySchema);
