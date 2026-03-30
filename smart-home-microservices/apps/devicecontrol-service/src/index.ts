import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ service: 'devicecontrol-service', status: 'ok' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`DeviceControl service running on port ${PORT}`);
});

export default app;
