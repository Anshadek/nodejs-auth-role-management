import bcrypt from 'bcryptjs';
import { User, Role, UserRole, RefreshToken } from '../models/index.js';
import { signAccessToken, signRefreshToken } from '../utils/token.util.js';

const SALT = 10;

export const register = async ({ name, email, password, roles = ['user'] }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const hashed = await bcrypt.hash(password, SALT);
  const user = await User.create({ name, email, password: hashed });

  // attach roles (create roles if not exist)
  for (const r of roles) {
    const [role] = await Role.findOrCreate({ where: { name: r } });
    await user.addRole(role);
  }

  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });

  // parse refresh token expiry date from JWT payload
  const payload = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
  const expiresAt = new Date(payload.exp * 1000);

  await RefreshToken.create({ token: refreshToken, userId: user.id, expiresAt });

  return { user: { id: user.id, name: user.name, email: user.email }, accessToken, refreshToken };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');

  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });

  const payload = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
  const expiresAt = new Date(payload.exp * 1000);

  await RefreshToken.create({ token: refreshToken, userId: user.id, expiresAt });

  return { user: { id: user.id, name: user.name, email: user.email }, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('No token provided');
  const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!stored || stored.revoked) throw new Error('Invalid refresh token');
  if (new Date() > new Date(stored.expiresAt)) throw new Error('Refresh token expired');

  const { userId } = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
  const accessToken = signAccessToken({ userId });
  return { accessToken };
};

export const logout = async (refreshToken) => {
  await RefreshToken.update({ revoked: true }, { where: { token: refreshToken } });
};
