import crypto from 'crypto';
import { redisClient } from '../config/redis';

type UserRole = 'admin' | 'resident' | 'viewer';

interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

interface SessionData {
  userId: string;
  username: string;
  role: UserRole;
}

class AuthService {
  private users: User[] = [
    {
      id: '1',
      username: 'admin1',
      password: '123456',
      role: 'admin'
    },
    {
      id: '2',
      username: 'resident1',
      password: '123456',
      role: 'resident'
    },
    {
      id: '3',
      username: 'viewer1',
      password: '123456',
      role: 'viewer'
    }
  ];

  async login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return null;
    }

    const token = crypto.randomUUID();

    const sessionData: SessionData = {
      userId: user.id,
      username: user.username,
      role: user.role
    };

    await redisClient.set(
      `session:${token}`,
      JSON.stringify(sessionData),
      {
        EX: 3600
      }
    );

    return {
      token,
      role: user.role
    };
  }

  async validate(token: string) {
    const session = await redisClient.get(`session:${token}`);

    if (!session) {
      return null;
    }

    const parsedSession: SessionData = JSON.parse(session);

    return {
      valid: true,
      userId: parsedSession.userId,
      username: parsedSession.username,
      role: parsedSession.role
    };
  }

  async logout(token: string) {
    const deletedCount = await redisClient.del(`session:${token}`);
    return deletedCount > 0;
  }
}

export default new AuthService();