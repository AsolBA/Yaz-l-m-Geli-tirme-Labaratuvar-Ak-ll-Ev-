import 'dotenv/config';
import app from './app';
import { connectRedis } from './config/redis';
import { connectDB } from './config/db';
import { seedUsersIfEmpty } from './services/seedUsers';

const PORT = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  await connectDB();
  await seedUsersIfEmpty();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();