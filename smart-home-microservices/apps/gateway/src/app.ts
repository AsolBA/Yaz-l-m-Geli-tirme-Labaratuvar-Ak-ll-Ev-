import express from 'express';
import proxyRoutes from './routes/proxyRoutes';
import authProxyRoutes from './routes/authProxyRoutes';
import { metricsHandler, metricsMiddleware } from './metrics/prometheusMetrics';
import { accessLogToFile } from './logging/accessLogToFile';

const app = express();

app.use(express.json());
app.use(accessLogToFile);
app.use(metricsMiddleware);

app.get('/metrics', metricsHandler);

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'gateway',
    status: 'ok'
  });
});

app.use('/api/auth', authProxyRoutes);
app.use('/api', proxyRoutes);

export default app;