import express from 'express';
import telemetryRoutes from './routes/telemetryRoutes';
import { requireInternalService } from './middlewares/requireInternalService';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'telemetry-service',
    status: 'ok'
  });
});

app.use('/telemetry', requireInternalService, telemetryRoutes);

export default app;