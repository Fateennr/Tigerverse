const { pool } = require('../db/mysql');

async function createRefreshToken({ userId, token, expiresAt }) {
  const sql = `
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `;
  await pool.execute(sql, [userId, token, expiresAt]);
}

async function findRefreshToken(token) {
  const sql = `
    SELECT id, user_id, token, expires_at, revoked_at
    FROM refresh_tokens
    WHERE token = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [token]);
  return rows[0] || null;
}

async function revokeRefreshToken(token) {
  const sql = `
    UPDATE refresh_tokens
    SET revoked_at = NOW()
    WHERE token = ? AND revoked_at IS NULL
  `;
  await pool.execute(sql, [token]);
}

module.exports = {
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken
};