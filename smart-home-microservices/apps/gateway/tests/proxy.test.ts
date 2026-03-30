import request from 'supertest';
import app from '../src/app';

describe('Gateway Proxy Routing', () => {
  it('should route /api/telemetry to telemetry service', async () => {
    const response = await request(app)
      .get('/api/telemetry')
      .set('Authorization', 'Bearer valid-admin-token');

    expect(response.status).toBe(200);
    expect(response.body.service).toBe('telemetry-service');
  });

  it('should route /api/devices to devicecontrol service', async () => {
    const response = await request(app)
      .get('/api/devices')
      .set('Authorization', 'Bearer valid-admin-token');

    expect(response.status).toBe(200);
    expect(response.body.service).toBe('devicecontrol-service');
  });
});
