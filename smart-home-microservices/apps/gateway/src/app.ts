import express from 'express';
import telemetryRoutes from './routes/telemetryRoutes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ service: 'gateway', status: 'ok' });
});

app.use('/api/telemetry', telemetryRoutes);

export default app;
