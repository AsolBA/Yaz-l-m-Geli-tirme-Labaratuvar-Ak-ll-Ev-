"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const internalToken_1 = require("../internalToken");
const router = (0, express_1.Router)();
const authAxiosConfig = () => ({
    headers: {
        ...(0, internalToken_1.internalServiceHeaders)(),
        'Content-Type': 'application/json'
    }
});
router.post('/login', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/login', req.body, authAxiosConfig());
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {
            error: true,
            message: 'Auth service unavailable'
        });
    }
});
router.post('/register', async (req, res) => {
    try {
        const response = await axios_1.default.post('http://auth-service:3001/auth/register', req.body, authAxiosConfig());
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
        const response = await axios_1.default.post('http://auth-service:3001/auth/validate', req.body, authAxiosConfig());
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
        const response = await axios_1.default.post('http://auth-service:3001/auth/logout', req.body, authAxiosConfig());
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
