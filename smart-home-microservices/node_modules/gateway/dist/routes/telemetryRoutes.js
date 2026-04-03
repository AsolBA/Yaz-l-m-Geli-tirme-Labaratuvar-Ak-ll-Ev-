"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authMiddleware, (_req, res) => {
    res.status(200).json({
        error: false,
        message: 'Telemetry data fetched successfully'
    });
});
exports.default = router;
