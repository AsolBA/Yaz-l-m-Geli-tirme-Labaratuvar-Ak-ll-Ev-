export class InternalServiceCredentials {
  private static instance: InternalServiceCredentials;

  static getInstance(): InternalServiceCredentials {
    if (!InternalServiceCredentials.instance) {
      InternalServiceCredentials.instance = new InternalServiceCredentials();
    }
    return InternalServiceCredentials.instance;
  }

  getToken(): string {
    const token = process.env.INTERNAL_SERVICE_TOKEN;
    if (!token?.trim()) {
      throw new Error('INTERNAL_SERVICE_TOKEN is required');
    }
    return token;
  }

  getHeaders(): Record<string, string> {
    return { 'X-Internal-Token': this.getToken() };
  }
}
