import app from './app';
import { connectRedis } from './config/redis';

const PORT = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();