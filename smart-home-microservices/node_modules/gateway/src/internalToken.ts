import { InternalServiceCredentials } from './security/InternalServiceCredentials';

export const internalServiceHeaders = (): Record<string, string> =>
  InternalServiceCredentials.getInstance().getHeaders();
