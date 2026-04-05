"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServiceHeaders = void 0;
const InternalServiceCredentials_1 = require("./security/InternalServiceCredentials");
const internalServiceHeaders = () => InternalServiceCredentials_1.InternalServiceCredentials.getInstance().getHeaders();
exports.internalServiceHeaders = internalServiceHeaders;
