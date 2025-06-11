const db = require('../config/db');

const User ={
  getUserByEmail: async (email) => {
    
        const sql ='SELECT * FROM user_tbl WHERE email = ?'
        const [rows] = await db.execute(sql, [email]);
    return rows[0]; 
  },

  createUser: async (email, role_id) => {
        const sql ='INSERT INTO user_tbl (email, role_id) VALUES (?, ?)'
        const [result] = await db.execute(sql, [email, role_id]);
    return result.insertId; 
  },  getUserRole: async (roleId) => {
   
        const sql = 'SELECT id, role_name FROM role_tbl WHERE id = ?'
         const [rows] = await db.execute(sql, [roleId]);
    return rows;
  }
  // Set permission for a role on a module (admin action)
//   setPermission: async (role_id, module_id, has_access) => {

//      const sql= `INSERT INTO module_permission_tbl (role_id, module_id, has_access) VALUES (?, ?, ?) `
//          const [result] = await db.execute(sql,[role_id, module_id, has_access]);

//     return result;
//   },
//   updatePermission : async (role_id, module_id, has_access) => {

//      const sql= `UPDATE module_permission_tbl (role_id=?, module_id=?, has_access=?) VALUES (?, ?, ?) `
//          const [result] = await db.execute(sql,[role_id, module_id, has_access]);

//     return result;
//   },
//   getUserRole : async (roleId, moduleName) => {
//         const sql =`SELECT * FROM module_permission_tbl mp JOIN module_tbl m ON mp.module_id = m.id
//                         WHERE mp.role_id = ? AND mp.has_access = 1 AND m.module_name = ?`
//         const [rows] = await db.execute(sql, [roleId, moduleName]);
//     return rows[0]; 
//   },

  
};
module.exports= User