const db=require("../config/db");

const loginModel = {
    async getEmail (mail) {
        const sql = `SELECT * FROM users WHERE mail = ?`;
        const [rows] = await db.query(sql, [mail]);
        return rows[0];
    },
    async register(userData) {  
        const { name, mail,ph_num, hashedpassword } = userData;

        const sql = `INSERT INTO users (name, mail,ph_num, password) VALUES (?, ?, ?, ?)`;
        const values = [name, mail,ph_num, hashedpassword];
        const [result] = await db.query(sql, values);
        return { id: result.insertId, ...userData };
    },
    async getUserById(id) {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },
    async getAllUsers() {
        const sql = `SELECT * FROM users`;
        const [rows] = await db.query(sql);
        return rows;
    }

}
module.exports = loginModel;