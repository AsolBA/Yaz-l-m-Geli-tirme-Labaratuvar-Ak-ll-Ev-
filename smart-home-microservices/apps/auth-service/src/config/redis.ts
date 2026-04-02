import { createClient } from 'redis';

export const redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Auth Redis connected');
  }
};