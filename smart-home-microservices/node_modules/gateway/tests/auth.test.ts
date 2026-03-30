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

  it('should return 403 when user does not have permission to access telemetry', async () => {
    const response = await request(app)
      .get('/api/telemetry')
      .set('Authorization', 'Bearer fake-token-without-permission');

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: true,
      message: 'Forbidden'
    });
  });

  it('should allow access when user has valid admin token', async () => {
    const response = await request(app)
      .get('/api/telemetry')
      .set('Authorization', 'Bearer valid-admin-token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: false,
      message: 'Telemetry data fetched successfully'
    });
  });
});
