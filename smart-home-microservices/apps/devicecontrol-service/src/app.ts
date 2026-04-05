import express from 'express';
import deviceRoutes from './routes/deviceRoutes';
import { requireInternalService } from './middlewares/requireInternalService';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'devicecontrol-service',
    status: 'ok'
  });
});

app.use('/devices', requireInternalService, deviceRoutes);

export default app;