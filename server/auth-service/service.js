const { hashPassword, comparePassword } = require('../utils/password');
const { signAccessToken, generateRefreshToken } = require('../utils/token');
const userRepository = require('../repositories/userRepository');
const refreshTokenRepository = require('../repositories/refreshTokenRepository');

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

async function register({ email, password }) {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }

  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const existing = await userRepository.getUserByEmail(email);
  if (existing) {
    const err = new Error('Email already exists');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);
  const user = await userRepository.createUser({ email, passwordHash });

  const accessToken = signAccessToken(user);
  const refreshToken = generateRefreshToken();
  const expiresAt = addDays(new Date(), 30);

  await refreshTokenRepository.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt
  });

  return {
    user,
    accessToken,
    refreshToken
  };
}

async function login({ email, password }) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const accessToken = signAccessToken(user);
  const refreshToken = generateRefreshToken();
  const expiresAt = addDays(new Date(), 30);

  await refreshTokenRepository.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  };
}

async function refresh({ refreshToken }) {
  const tokenRow = await refreshTokenRepository.findRefreshToken(refreshToken);

  if (!tokenRow || tokenRow.revoked_at) {
    const err = new Error('Invalid refresh token');
    err.statusCode = 401;
    throw err;
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    const err = new Error('Refresh token expired');
    err.statusCode = 401;
    throw err;
  }

  const user = await userRepository.getUserById(tokenRow.user_id);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  await refreshTokenRepository.revokeRefreshToken(refreshToken);

  const newRefreshToken = generateRefreshToken();
  const expiresAt = addDays(new Date(), 30);

  await refreshTokenRepository.createRefreshToken({
    userId: user.id,
    token: newRefreshToken,
    expiresAt
  });

  const accessToken = signAccessToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken
  };
}

async function logout({ refreshToken }) {
  await refreshTokenRepository.revokeRefreshToken(refreshToken);
  return { success: true };
}

module.exports = {
  register,
  login,
  refresh,
  logout
};