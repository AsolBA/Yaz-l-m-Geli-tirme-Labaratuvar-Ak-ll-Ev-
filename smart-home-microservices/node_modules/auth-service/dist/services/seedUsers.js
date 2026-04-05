"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsersIfEmpty = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const DEFAULT_USERS = [
    { username: 'admin1', password: '123456', role: 'admin' },
    { username: 'resident1', password: '123456', role: 'resident' },
    { username: 'viewer1', password: '123456', role: 'viewer' }
];
const seedUsersIfEmpty = async () => {
    const count = await User_1.default.countDocuments();
    if (count > 0) {
        return;
    }
    for (const u of DEFAULT_USERS) {
        const passwordHash = await bcrypt_1.default.hash(u.password, 10);
        await User_1.default.create({
            username: u.username,
            passwordHash,
            role: u.role
        });
    }
    console.log('Auth: default users seeded (admin1, resident1, viewer1 / 123456)');
};
exports.seedUsersIfEmpty = seedUsersIfEmpty;
