const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: env.accessTokenExpiresIn }
  );
}

function generateRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}

module.exports = {
  signAccessToken,
  generateRefreshToken
};