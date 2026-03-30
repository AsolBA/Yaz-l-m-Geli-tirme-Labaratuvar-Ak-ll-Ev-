import express from 'express';
import proxyRoutes from './routes/proxyRoutes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'gateway',
    status: 'ok'
  });
});

app.use('/api', proxyRoutes);

export default app;