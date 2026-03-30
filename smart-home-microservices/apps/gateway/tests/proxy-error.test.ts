import request from 'supertest';
import app from '../src/app';

describe('Gateway Proxy Error Handling', () => {
  it('should return 502 when telemetry service is unavailable', async () => {
    const response = await request(app)
      .get('/api/telemetry-unavailable')
      .set('Authorization', 'Bearer valid-admin-token');

    expect(response.status).toBe(502);
    expect(response.body).toEqual({
      error: true,
      message: 'Bad Gateway'
    });
  });
});
