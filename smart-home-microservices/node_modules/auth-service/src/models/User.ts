import mongoose from 'mongoose';

export type UserRole = 'admin' | 'resident' | 'viewer';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'resident', 'viewer'],
    required: true
  }
});

export default mongoose.model('User', userSchema);
