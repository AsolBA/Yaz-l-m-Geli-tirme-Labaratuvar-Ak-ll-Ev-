import express from 'express';
import telemetryRoutes from './routes/telemetryRoutes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'telemetry-service',
    status: 'ok'
  });
});

app.use('/telemetry', telemetryRoutes);

export default app;