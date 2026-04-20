const { pool } = require('../db/mysql');

async function createUser({ email, passwordHash, role = 'user' }) {
  const sql = `
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [email, passwordHash, role]);
  return getUserById(result.insertId);
}

async function getUserByEmail(email) {
  const sql = `
    SELECT id, email, password_hash, role, created_at, updated_at
    FROM users
    WHERE email = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [email]);
  return rows[0] || null;
}

async function getUserById(id) {
  const sql = `
    SELECT id, email, role, created_at, updated_at
    FROM users
    WHERE id = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};