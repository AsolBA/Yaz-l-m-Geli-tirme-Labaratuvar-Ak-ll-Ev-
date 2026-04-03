"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deviceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['light', 'thermostat', 'camera', 'lock'],
        required: true
    },
    status: {
        type: String,
        enum: ['on', 'off'],
        required: true
    },
    brightness: { type: Number },
    targetTemperature: { type: Number },
    locked: { type: Boolean }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Device', deviceSchema);
