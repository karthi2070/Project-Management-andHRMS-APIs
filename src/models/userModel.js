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
issueSSOToken: async (req, res, next) => {
    try { const { email } = req.user; // email from Google SSO
    const { role_id } = req.body; // role_id from request body

    console.log("email:", email);
    console.log("role_id:", role_id);
      const user = await User.createOrGetSSOUser(email,role_id);
      console.log(user)
      const payload ={ id: user.id, role_id: user.role_id, email: user.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({
        success: true,
        token,
        userId: user.id,
        roleId: user.role_id,
        loginMethod: 'google'
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }

  return existingUser;
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