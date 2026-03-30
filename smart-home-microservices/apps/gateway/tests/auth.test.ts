import request from 'supertest';
import app from '../src/app';

describe('Gateway Auth Middleware', () => {
  it('should return 401 when no token is provided for protected telemetry route', async () => {
    const response = await request(app).get('/api/telemetry');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: true,
      message: 'Unauthorized'
    });
  });
});
