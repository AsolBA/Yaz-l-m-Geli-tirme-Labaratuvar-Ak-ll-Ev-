import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { redisClient } from '../config/redis';
import User, { UserRole } from '../models/User';

interface SessionData {
  userId: string;
  username: string;
  role: UserRole;
}

class AuthService {
  async register(username: string, password: string, role: UserRole) {
    const validRoles: UserRole[] = ['admin', 'resident', 'viewer'];

    if (!validRoles.includes(role)) {
      return { error: 'Invalid role' as const };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const created = await User.create({
        username,
        passwordHash,
        role
      });

      return {
        id: String(created._id),
        username: created.username,
        role: created.role
      };
    } catch {
      return { error: 'User already exists' as const };
    }
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return null;
    }

    const token = crypto.randomUUID();

    const sessionData: SessionData = {
      userId: String(user._id),
      username: user.username,
      role: user.role as UserRole
    };

    await redisClient.set(`session:${token}`, JSON.stringify(sessionData), {
      EX: 3600
    });

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
