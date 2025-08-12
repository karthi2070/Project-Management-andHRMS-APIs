const db = require('../config/db'); 

const serviceModel = {
  async create(data) {

    //id, user_id, client_id, service_name, from_date, to_date, service_amount, paid_amount, balance_amount, payment_status, notes
    const sql = `INSERT INTO service_tbl 
      (user_id ,client_id, service_name, from_date, to_date,service_amount, paid_amount, balance_amount, payment_status, followup_date,notes) 
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
    const serviceAmountWithTax = data.service_amount * 1.18;
    const balanceAmount= data.service_amount * 1.18 - data.paid_amount;
    console.log(balanceAmount)

    const [result] = await db.execute(sql, [
      data.user_id,
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      serviceAmountWithTax,
      data.paid_amount,
      balanceAmount,
      data.payment_status || 1,
      data.followup_date,
      data.notes ]);
    console.log(result);
    return { id: result.insertId };
  },

  async updateServiceTotals(updateServiceData) {
    const { user_id, paid_amount, balance_amount, payment_status, id } = updateServiceData
console.log(updateServiceData)
    const query = `UPDATE service_tbl 
       SET user_id =?, paid_amount = ?, balance_amount = ?, payment_status = ?
       WHERE id = ? AND is_deleted = 0`
    const [result] = await db.query(query, [user_id, paid_amount, balance_amount, payment_status, id])
    return result;
  },
  async update(id, data) {
    const sql = `UPDATE service_tbl SET 
      user_id = ?, client_id = ?, service_name = ?, from_date = ?, to_date = ?,service_amount=?, paid_amount=?, balance_amount=?, payment_status = ? ,followup_date = ?, notes = ?
      WHERE id = ? AND is_deleted = 0`;
      const serviceAmountWithTax = data.service_amount * 1.18;
      const balanceAmount= data.service_amount * 1.18 - data.paid_amount;

    const [result] =await db.execute(sql, [
      data.user_id,
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      serviceAmountWithTax,
      data.paid_amount,
      balanceAmount,
      data.payment_status,
      data.followup_date,
      data.notes ,
      id
    ]);
    return result.affectedRows > 0 ? { id } : null  ;
  },
  async paymentUpdate(id, status) {// payment date,amount,
    const sql = `UPDATE service_tbl SET  payment_status = ? WHERE id = ? AND is_deleted = 0`;
    await db.execute(sql, [status, id]);
    return { id, payment_status: status };
  },


  async getAll() {
    const sql = `SELECT * FROM service_tbl WHERE is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  },
  async paymentFilter(status) {
    const sql = `SELECT * FROM service_tbl WHERE payment_status = ? AND is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql, [status]);
    return rows;
  },
  async getByClientId(clientId) {
    const sql = `SELECT * FROM service_tbl WHERE client_id = ? AND is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql, [clientId]);
    return rows;
  },

  async getById(id) {
    const sql = `SELECT * FROM service_tbl WHERE id = ? AND is_deleted = 0`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },
// get  next  due payment data
  async delete(id) {
    const sql = `UPDATE service_tbl SET is_deleted = 1 WHERE id = ?`;
    await db.execute(sql, [id]);
    return { id, deleted: true };
  },


async getUpcomingServiceCount  (days) {
  const sql = `
    SELECT COUNT(DISTINCT sp.service_id) AS service_count
    FROM service_payment_tbl sp
    WHERE sp.is_deleted = 0
      AND sp.payment_status = 2
      AND sp.followup_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + INTERVAL ? DAY;
  `;
  const [rows] = await db.query(sql,[days]);
  return rows[0]?.service_count || 0;
},

async getUpcomingServiceDetails (days) {
  console.log(days)
  const sql = `
   SELECT 
     c.id AS CLIENT_ID,
      c.client_id,
      c.name AS client_name,
      s.id AS service_id,
      s.service_name,
      s.from_date,
      s.to_date,
      s.service_amount,
      s.paid_amount,
      s.balance_amount,
      s.payment_status,
      sp.id AS service_payment_id,
      sp.followup_date
    FROM service_payment_tbl sp
    JOIN service_tbl s ON sp.service_id = s.id
    JOIN client_tbl c ON sp.client_id = c.id
    WHERE sp.is_deleted = 0
      AND sp.followup_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + INTERVAL ? DAY
      ORDER BY sp.followup_date ASC;
  `;
  const [rows] = await db.query(sql,[days]);
    // console.log(rows)
  return rows;
},

 async getUpcomingFollowupFromService(start_date, end_date) {
    const sql = `WITH upcoming_followups AS (
  SELECT id
  FROM service_tbl
  WHERE is_deleted = 0 AND paid_amount = 0
    AND followup_date BETWEEN ? AND ? 
)
SELECT 
  COUNT(*) AS upcoming_followup_count,
  JSON_ARRAYAGG(id) AS upcoming_followup_ids
FROM upcoming_followups;`
    const [rows] = await db.query(sql, [start_date, end_date]);
    // console.log("upcoming_followup", rows[0])
    const upcoming_followup_count = rows[0].upcoming_followup_count;
    const upcoming_followup_ids = rows[0].upcoming_followup_ids;
    // If no clients found, return empty
    if (!upcoming_followup_ids || upcoming_followup_ids.length === 0) {
      return {
        source: 'service_tbl',
        service_count: 0,
        service_details: []
      };
    }

    const clientQuery = ` SELECT c.id,c.name AS client_name,c.client_id, c.company_name,
    s.id, s.service_name, s.client_id, s.from_date, s.to_date, s.service_amount,s.paid_amount, s.balance_amount, s.payment_status,s.followup_date
   FROM service_tbl as s
   join client_tbl as c on s.client_id = c.id
   WHERE s.id IN (${upcoming_followup_ids.map(() => '?').join(',')})
   ORDER BY s.followup_date ASC
 `;
    const [serviceDetails] = await db.query(clientQuery, upcoming_followup_ids);
      return {
    source: 'service_tbl',
    service_count: upcoming_followup_count,
    service_details: serviceDetails
  };
  },

  async getUpcomingFollowupFromServicePaymentTable(start_date, end_date) {
  
    const sql = `WITH upcoming_followups AS (
  SELECT id
  FROM service_payment_tbl
  WHERE is_deleted = 0 
    AND followup_date BETWEEN ? AND ? 
)
SELECT 
  COUNT(*) AS upcoming_followup_count,
  JSON_ARRAYAGG(id) AS upcoming_followup_ids
FROM upcoming_followups`
    const [rows] = await db.query(sql,[start_date, end_date]);
    // console.log("upcoming_followup", rows[0])
    const upcoming_followup_count = rows[0].upcoming_followup_count;
    const upcoming_followup_ids = rows[0].upcoming_followup_ids;
    // If no clients found, return empty
    if (!upcoming_followup_ids || upcoming_followup_ids.length === 0) {
      return {
          source: 'service_payment_tbl',
          service_count: 0,
          service_details: []
        };
    }
    const clientQuery = ` SELECT c.id as client_id, c.name AS client_name,c.client_id, c.company_name,
    s.id as service_id , s.service_name, s.client_id,s.service_amount, s.paid_amount, s.balance_amount, s.payment_status,
    sp.id as service_payment_id, sp.client_id, sp.followup_date

   FROM service_payment_tbl as sp
   join service_tbl as s on sp.service_id = s.id
   join client_tbl as c on sp.client_id = c.id
   WHERE sp.id IN (${upcoming_followup_ids.map(() => '?').join(',')}) 
   ORDER BY sp.followup_date ASC
 `;
    const [serviceDetails] = await db.query(clientQuery, upcoming_followup_ids);

      return {
    source: 'service_payment_tbl',
    service_count: upcoming_followup_count,
    service_details: serviceDetails
  };
  },

//
  async insertServicePayment(data) {
    console.log(data)
    const { user_id, client_id, service_id, paid_amount, payment_date, payment_method, payment_status, followup_date, notes } = data;

    const query = `INSERT INTO service_payment_tbl
       (user_id,client_id, service_id, paid_amount, payment_date, payment_method, payment_status, followup_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [user_id, client_id, service_id, paid_amount, payment_date, payment_method, payment_status, followup_date, notes]
    const [result] = await db.query(query, values);
    return result;
  },

   async getFollowupPaymentId(client_id, service_id) {
    const query = `SELECT * FROM service_payment_tbl WHERE client_id = ? AND service_id = ? AND is_deleted = 0 ORDER BY created_at DESC`;
    const [rows] = await db.query(query, [client_id,  service_id]);
    return rows;

  },
  async getFollowupPaymentServiceId(service_id, id) {

    const query = `SELECT * FROM service_payment_tbl WHERE service_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await db.query(query, [ service_id, id]);
    return rows;
  },
};

module.exports = serviceModel;
