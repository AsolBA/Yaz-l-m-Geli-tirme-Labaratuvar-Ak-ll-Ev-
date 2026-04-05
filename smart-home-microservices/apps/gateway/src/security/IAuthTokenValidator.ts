export interface AuthenticatedGatewayUser {
  valid: boolean;
  userId: string;
  username: string;
  role: string;
}

export type TokenValidationOutcome =
  | { status: 'ok'; user: AuthenticatedGatewayUser }
  | { status: 'invalid' }
  | { status: 'unreachable' };

export interface IAuthTokenValidator {
  validateBearerToken(token: string): Promise<TokenValidationOutcome>;
}
