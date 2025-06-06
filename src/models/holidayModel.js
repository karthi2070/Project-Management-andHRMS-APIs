const db = require('../config/db');

const holidaysModel = {
    createHoliday: async (data) => {
        const { date, day, holiday } = data;
        const sql = `
            INSERT INTO holidays_tbl (date, day, holiday) 
            VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql, [date, day, holiday]);
        return result;
    },

    getAllHolidays: async () => {
        const sql = `SELECT * FROM holidays_tbl ORDER BY date ASC`;
        const [result] = await db.execute(sql);
        return result;
    },

    getHolidayById: async (id) => {
        const sql = `SELECT * FROM holidays_tbl WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result[0];
    },

    updateHoliday: async (id, data) => {
        const { date, day, holiday } = data;
        const sql = `
            UPDATE holidays_tbl 
            SET date = ?, day = ?, holiday = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?`;
        const [result] = await db.execute(sql, [date, day, holiday, id]);
        return result;
    },

    deleteHoliday: async (id) => {
        const sql = `  UPDATE holidays_tbl SET is_deleted =1 WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result;
    },
};

module.exports = holidaysModel;
