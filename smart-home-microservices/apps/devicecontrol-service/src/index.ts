import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3003;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`DeviceControl service running on port ${PORT}`);
  });
};

startServer();