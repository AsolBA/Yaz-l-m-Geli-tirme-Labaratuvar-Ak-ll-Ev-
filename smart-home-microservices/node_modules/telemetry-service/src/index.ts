import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Telemetry service running on port ${PORT}`);
  });
};

startServer();