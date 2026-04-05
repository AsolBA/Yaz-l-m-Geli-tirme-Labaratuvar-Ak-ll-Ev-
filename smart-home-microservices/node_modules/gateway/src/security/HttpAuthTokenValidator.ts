import axios from 'axios';
import { internalServiceHeaders } from '../internalToken';
import type {
  AuthenticatedGatewayUser,
  IAuthTokenValidator,
  TokenValidationOutcome
} from './IAuthTokenValidator';

export class HttpAuthTokenValidator implements IAuthTokenValidator {
  constructor(
    private readonly validateUrl: string = 'http://auth-service:3001/auth/validate'
  ) {}

  async validateBearerToken(token: string): Promise<TokenValidationOutcome> {
    try {
      const response = await axios.post<{ valid: boolean } & AuthenticatedGatewayUser>(
        this.validateUrl,
        { token },
        {
          headers: {
            ...internalServiceHeaders(),
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.valid) {
        return { status: 'invalid' };
      }

      return { status: 'ok', user: response.data as AuthenticatedGatewayUser };
    } catch {
      return { status: 'unreachable' };
    }
  }
}
