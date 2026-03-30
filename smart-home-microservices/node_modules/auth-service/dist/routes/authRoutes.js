"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = __importDefault(require("../services/authService"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: true,
            message: 'Username and password are required'
        });
        return;
    }
    const result = authService_1.default.login(username, password);
    if (!result) {
        res.status(401).json({
            error: true,
            message: 'Invalid credentials'
        });
        return;
    }
    res.status(200).json({
        error: false,
        token: result.token,
        role: result.role
    });
});
router.post('/validate', (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(400).json({
            error: true,
            message: 'Token is required'
        });
        return;
    }
    const result = authService_1.default.validate(token);
    if (!result) {
        res.status(401).json({
            error: true,
            message: 'Invalid token'
        });
        return;
    }
    res.status(200).json(result);
});
router.post('/logout', (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(400).json({
            error: true,
            message: 'Token is required'
        });
        return;
    }
    const success = authService_1.default.logout(token);
    if (!success) {
        res.status(401).json({
            error: true,
            message: 'Invalid token'
        });
        return;
    }
    res.status(200).json({
        error: false,
        message: 'Logged out successfully'
    });
});
exports.default = router;
