import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    service: 'auth-service',
    status: 'ok'
  });
});

app.use('/auth', authRoutes);

export default app;
