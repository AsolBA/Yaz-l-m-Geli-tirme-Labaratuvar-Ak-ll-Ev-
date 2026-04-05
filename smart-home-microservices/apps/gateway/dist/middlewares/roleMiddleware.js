"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const RoleBasedAccessGate_1 = require("../security/RoleBasedAccessGate");
exports.authorizeRoles = RoleBasedAccessGate_1.RoleBasedAccessGate.middleware;
