import express from 'express';
import deviceRoutes from './routes/deviceRoutes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'devicecontrol-service',
    status: 'ok'
  });
});

app.use('/devices', deviceRoutes);

export default app;