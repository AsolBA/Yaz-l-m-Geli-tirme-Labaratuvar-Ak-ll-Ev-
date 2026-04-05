import bcrypt from 'bcrypt';
import User, { UserRole } from '../models/User';

const DEFAULT_USERS: { username: string; password: string; role: UserRole }[] =
  [
    { username: 'admin1', password: '123456', role: 'admin' },
    { username: 'resident1', password: '123456', role: 'resident' },
    { username: 'viewer1', password: '123456', role: 'viewer' }
  ];

export const seedUsersIfEmpty = async (): Promise<void> => {
  const count = await User.countDocuments();
  if (count > 0) {
    return;
  }

  for (const u of DEFAULT_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await User.create({
      username: u.username,
      passwordHash,
      role: u.role
    });
  }

  console.log('Auth: default users seeded (admin1, resident1, viewer1 / 123456)');
};
