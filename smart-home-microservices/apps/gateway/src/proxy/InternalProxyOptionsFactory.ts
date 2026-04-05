import http from 'http';
import { InternalServiceCredentials } from '../security/InternalServiceCredentials';

export class InternalProxyOptionsFactory {
  createBaseOptions(): {
    proxyReqOptDecorator: (
      proxyReqOpts: http.RequestOptions
    ) => http.RequestOptions;
  } {
    return {
      proxyReqOptDecorator: (
        proxyReqOpts: http.RequestOptions
      ): http.RequestOptions => {
        proxyReqOpts.headers = { ...proxyReqOpts.headers };
        const h = proxyReqOpts.headers as Record<string, string>;
        h['X-Internal-Token'] =
          InternalServiceCredentials.getInstance().getToken();
        return proxyReqOpts;
      }
    };
  }
}
