"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            res.status(403).json({
                error: true,
                message: 'Forbidden'
            });
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
