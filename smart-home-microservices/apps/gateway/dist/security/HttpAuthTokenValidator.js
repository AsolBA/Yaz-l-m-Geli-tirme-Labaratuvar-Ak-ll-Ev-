"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAuthTokenValidator = void 0;
const axios_1 = __importDefault(require("axios"));
const internalToken_1 = require("../internalToken");
class HttpAuthTokenValidator {
    constructor(validateUrl = 'http://auth-service:3001/auth/validate') {
        this.validateUrl = validateUrl;
    }
    async validateBearerToken(token) {
        try {
            const response = await axios_1.default.post(this.validateUrl, { token }, {
                headers: {
                    ...(0, internalToken_1.internalServiceHeaders)(),
                    'Content-Type': 'application/json'
                }
            });
            if (!response.data.valid) {
                return { status: 'invalid' };
            }
            return { status: 'ok', user: response.data };
        }
        catch {
            return { status: 'unreachable' };
        }
    }
}
exports.HttpAuthTokenValidator = HttpAuthTokenValidator;
