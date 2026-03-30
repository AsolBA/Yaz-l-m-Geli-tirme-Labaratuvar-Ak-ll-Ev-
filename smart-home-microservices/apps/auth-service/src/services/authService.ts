import crypto from 'crypto';

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

  private sessions: Map<string, SessionData> = new Map();

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return null;
    }

    const token = crypto.randomUUID();

    this.sessions.set(token, {
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return {
      token,
      role: user.role
    };
  }

  validate(token: string) {
    const session = this.sessions.get(token);

    if (!session) {
      return null;
    }

    return {
      valid: true,
      userId: session.userId,
      username: session.username,
      role: session.role
    };
  }

  logout(token: string) {
    return this.sessions.delete(token);
  }
}

export default new AuthService();
