const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  getUserByEmail: async (email) => {
    const [rows] = await db.execute('SELECT id, email, password, role_id FROM user_tbl WHERE email = ?', [email]);
    return rows[0];
  },
  createUser: async (email, password, role_id) => {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const [result] = await db.execute(
      'INSERT INTO user_tbl (email, password, role_id) VALUES (?, ?, ?)',
      [email, hashedPassword, role_id]
    );
    return result.insertId;
  },
  createOrGetSSOUser: async (email,role_id) => {
    let user = await User.getUserByEmail(email);
    if (!user) {
     // const defaultRoleId = 2; // Default role for SSO users (e.g., 'user')
      const userId = await User.createUser(email, null, role_id);
      user = { id: userId, email, role_id: role_id };
    }
    return user;
  },
updatePassword: async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.execute(
      'UPDATE user_tbl SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
    return result.affectedRows;
  },
  updateUser: async (userId, email, role_id) => {
    const [result] = await db.execute(
      'UPDATE user_tbl SET email = ?, role_id = ? WHERE id = ?',
      [email, role_id, userId]
    );
    return result.affectedRows;
  },
  getUserRole: async (roleId) => {
    const [rows] = await db.execute('SELECT id, role_name FROM role_tbl WHERE id = ?', [roleId]);
    return rows;
  }
};

module.exports = User;