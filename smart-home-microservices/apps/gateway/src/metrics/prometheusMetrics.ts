import client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

new client.Gauge({
  name: 'gateway_instance_info',
  help: 'Scrape hedefi ayakta (her zaman 1)',
  labelNames: ['role'],
  registers: [register]
}).set({ role: 'api-gateway' }, 1);

const httpRequestDurationSeconds = new client.Histogram({
  name: 'gateway_http_request_duration_seconds',
  help: 'Gateway HTTP request duration in seconds',
  labelNames: ['method', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register]
});

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const durationNs = process.hrtime.bigint() - start;
    const seconds = Number(durationNs) / 1e9;
    httpRequestDurationSeconds.observe(
      { method: req.method, status_code: String(res.statusCode) },
      seconds
    );
  });
  next();
};

export const metricsHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
};
