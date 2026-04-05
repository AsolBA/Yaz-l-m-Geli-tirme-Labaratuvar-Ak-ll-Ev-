"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServiceHeaders = void 0;
const internalServiceHeaders = () => {
    const token = process.env.INTERNAL_SERVICE_TOKEN;
    if (!token?.trim()) {
        throw new Error('INTERNAL_SERVICE_TOKEN is required');
    }
    return {
        'X-Internal-Token': token
    };
};
exports.internalServiceHeaders = internalServiceHeaders;
