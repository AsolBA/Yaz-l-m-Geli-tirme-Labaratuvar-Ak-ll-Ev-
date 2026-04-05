"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServiceCredentials = void 0;
class InternalServiceCredentials {
    static getInstance() {
        if (!InternalServiceCredentials.instance) {
            InternalServiceCredentials.instance = new InternalServiceCredentials();
        }
        return InternalServiceCredentials.instance;
    }
    getToken() {
        const token = process.env.INTERNAL_SERVICE_TOKEN;
        if (!token?.trim()) {
            throw new Error('INTERNAL_SERVICE_TOKEN is required');
        }
        return token;
    }
    getHeaders() {
        return { 'X-Internal-Token': this.getToken() };
    }
}
exports.InternalServiceCredentials = InternalServiceCredentials;
