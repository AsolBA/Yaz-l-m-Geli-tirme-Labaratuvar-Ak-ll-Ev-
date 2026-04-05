"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalProxyOptionsFactory = void 0;
const InternalServiceCredentials_1 = require("../security/InternalServiceCredentials");
class InternalProxyOptionsFactory {
    createBaseOptions() {
        return {
            proxyReqOptDecorator: (proxyReqOpts) => {
                proxyReqOpts.headers = { ...proxyReqOpts.headers };
                const h = proxyReqOpts.headers;
                h['X-Internal-Token'] =
                    InternalServiceCredentials_1.InternalServiceCredentials.getInstance().getToken();
                return proxyReqOpts;
            }
        };
    }
}
exports.InternalProxyOptionsFactory = InternalProxyOptionsFactory;
