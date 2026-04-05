"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleBasedAccessGate = void 0;
class RoleBasedAccessGate {
    static middleware(...allowedRoles) {
        return (req, res, next) => {
            const user = req.user;
            if (!user || !allowedRoles.includes(user.role ?? '')) {
                res.status(403).json({
                    error: true,
                    message: 'Forbidden'
                });
                return;
            }
            next();
        };
    }
}
exports.RoleBasedAccessGate = RoleBasedAccessGate;
