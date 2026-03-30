import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ service: 'gateway', status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});

export default app;
