  const db = require('../config/db');

const Permission = {
    setPermission: async (role_id, module_id, has_access) => {

     const sql= `INSERT INTO module_permission_tbl (role_id, module_id, has_access) VALUES (?, ?, ?) `
         const [result] = await db.execute(sql,[role_id, module_id, has_access]);

    return result;
  },
  updatePermission : async (role_id, module_id, has_access) => {

     const sql= `UPDATE module_permission_tbl (role_id=?, module_id=?, has_access=?) VALUES (?, ?, ?) `
         const [result] = await db.execute(sql,[role_id, module_id, has_access]);

    return result;
  },
  checkModuleAccess : async (roleId, moduleName) => {
        const sql =`SELECT * FROM module_permission_tbl mp
                   JOIN module_tbl m ON mp.module_id = m.id
                        WHERE mp.role_id = ? AND mp.has_access = 1 AND m.module_name = ?`
        const [rows] = await db.execute(sql, [roleId, moduleName]);
    return rows[0]; 
  }
}
module.exports=Permission