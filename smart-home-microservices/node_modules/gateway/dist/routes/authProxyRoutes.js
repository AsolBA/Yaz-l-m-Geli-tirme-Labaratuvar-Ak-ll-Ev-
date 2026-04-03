"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/login', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {
            error: true,
            message: 'Auth service unavailable'
        });
    }
});
router.post('/validate', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/validate', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {
            error: true,
            message: 'Auth service unavailable'
        });
    }
});
router.post('/logout', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/logout', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {
            error: true,
            message: 'Auth service unavailable'
        });
    }
});
exports.default = router;
