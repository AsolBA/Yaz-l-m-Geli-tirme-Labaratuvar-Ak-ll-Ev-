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

  it('should route DELETE /api/devices/:id to devicecontrol service', async () => {
    const response = await request(app)
      .delete('/api/devices/507f1f77bcf86cd799439011')
      .set('Authorization', 'Bearer valid-admin-token');

    expect(response.status).toBe(200);
    expect(response.body.service).toBe('devicecontrol-service');
  });
});
