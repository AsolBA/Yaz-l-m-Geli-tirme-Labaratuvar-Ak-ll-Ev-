"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/authdb';
    try {
        await mongoose_1.default.connect(uri);
        console.log('Auth MongoDB connected');
    }
    catch (error) {
        console.error('Auth MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
