const pool = require('../config/db');
const attendanceModel = require('../models/attendanceModel');
const leaveModel = require('../models/leaveModel')

const salarySlipsModel = {

  async getAllComponentsByTemplateId(template_id) {
    const sql = `SELECT id, template_id, component_name, component_type, component_value, amount_type
                 FROM salary_components 
                 WHERE template_id = ? AND is_deleted = 0`;
    const [result] = await pool.query(sql, [template_id]);
    return result;
  },

async insertComponents(components) {
  const sql = `INSERT INTO salary_components 
    (template_id, component_name, component_type, component_value, amount_type) VALUES ?`;
  const values = components.map(c => [
    c.template_id,c.component_name,c.component_type,c.component_value,c.amount_type ]);

  const [result] = await pool.query(sql, [values]);
  return { insert_id: result.insertId };
},

  async updateComponent(id, data) {
    const sql = `UPDATE salary_components
                 SET component_name =? , component_type = ?, component_value= ?, amount_type = ?
                 WHERE id = ? AND is_deleted = 0`;
    const values = [
      data.component_name,
      data.component_type,
      data.component_value,
      data.amount_type,
      id
    ];
    const [result] = await pool.query(sql, values);
    return { changedRows: result.changedRows };
  },

  async softDeleteComponent(id) {
    const sql = `UPDATE salary_components SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const values = [id];
    const [result] = await pool.query(sql, values);
    return { affectedRows: result.affectedRows };
  },

  //templates
  async getAllTemplates() {
    const sql = `SELECT id, template_name, total_percentage
                 FROM salary_templates
                 WHERE is_deleted = 0`;
    const [result] = await pool.query(sql);
    return result;
  },

  async getTemplateById(id) {
    const sql = `SELECT id, template_name, total_percentage
                 FROM salary_templates
                 WHERE id = ? AND is_deleted = 0`;
    const values = [id];
    const [result] = await pool.query(sql, values);
    return result.length > 0 ? result[0] : null;
  },
  async getTemplateByIdWithComponents(id) {
    const sql = `select t.id,t.template_name,t.total_percentage, c.id, c.template_id, c.component_name, c.component_type, c.component_value, c.amount_type
    from salary_templates as t
    left join salary_components as c on t.id = c.template_id
    where t.id = ? ;`;
    const values = [id];
    const [rows] = await pool.query(sql, values);

    const formattedResponse = {
      template: {
        template_name: rows[0].template_name,
        total_percentage: rows[0].total_percentage
      },
      components: rows.map(row => ({
        component_name: row.component_name,
        component_type: row.component_type,
        component_value: row.component_value,
        amount_type: row.amount_type
      }))
    };
    // console.log(formattedResponse)
    return rows.length > 0 ? formattedResponse : null;
  },

  async insertTemplate(data) {
    const { template_name, total_percentage } = data
    const sql = `INSERT INTO salary_templates (template_name, total_percentage)
               VALUES (?, ?)`;
    const values = [template_name, total_percentage];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, template_name, total_percentage };
  }
  ,
  async updateTemplate(id, data) {
    const sql = `UPDATE salary_templates
                 SET template_name = ?, total_percentage = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE id = ? AND is_deleted = 0`;
    const values = [data.template_name, data.total_percentage, id];
    const [result] = await pool.query(sql, values);
    return { changedRows: result.changedRows };
  },

  async softDeleteTemplate(id) {
    const sql = `UPDATE salary_templates SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return { affectedRows: result.affectedRows };
  },

 // gen payslip model code 
  async getEmployeePayslipData(user_id) {
    const sql = `
      SELECT 
        u.id as userId, e.id as employeeId, e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.salary,e.pan,
        b.id as bankId, b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,
        t.id as templateId, t.template_name,c.template_id,c.id as component_id,c.component_name, c.component_type, c.component_value, c.amount_type
      FROM employee_tbl e
      JOIN user_tbl u on e.user_id = u.id 
      JOIN bank_details_tbl b ON e.id = b.employee_id
      JOIN salary_templates t ON e.salary_template_id = t.id
      JOIN salary_components c ON t.id = c.template_id 
      WHERE u.id = ?; `;
    const [result] = await pool.query(sql, [user_id]);
    return result;
  },

  async insertSalaryHistory(values) {
    //id, user_id, employee_id, bank_details_id, salary_date, salary_template_id, components, working_days, absent_days, leave_days, attendance_deduction_amount, total_salary, gross_amount, deductions_amount, net_payment, is_deleted, created_at
    const query = `
      INSERT INTO emp_salary_history (
        user_id, employee_id, bank_details_id, salary_date, salary_template_id,
        components, working_days, absent_days, leave_days, attendance_deduction_amount, total_salary, gross_amount, deductions_amount, net_payment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, values);
  },
  // get all payslilp 
async getpayslip() {
    const sql = `SELECT 
sh.user_id , e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.pan,
b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,t.template_name,
 sh.salary_date, sh.salary_template_id, sh.components, sh.total_salary, sh.gross_amount, sh.deductions_amount, sh.net_payment
FROM emp_salary_history sh
JOIN employee_tbl e on e.id =sh.employee_id
JOIN bank_details_tbl b ON  b.id =sh.bank_details_id
JOIN salary_templates t ON t.id = sh.salary_template_id 
where sh.is_deleted = 0 ORDER BY sh.created_at DESC`;

    const [result] = await pool.query(sql);
if (result.length === 0) {
      return { message: 'No payslip found ' };
    }
    // Format each payslip using map
  const formattedPayslips = result.map(row => ({
    "Employee details": {
      name: row.name,
      employee_id: row.employee_id,
      Date_of_Joining: row.doj,
      department: row.department,
      designation: row.designation,
    },
    "Account details": {
      acc_holder_name: row.acc_holder_name,
      account_number: row.account_number,
      bank_name: row.bank_name,
      pan_number: row.pan,
      pf_account_number: row.pf_account_number,
      uan_number: row.uan_number,
    },
    "Payslip details": {
      template_name: row.template_name,
      components: row.components
    },
    "Salary details": {
      salary_date: row.salary_date,
      salary: row.total_salary,
      gross_amount: row.gross_amount,
      deductions_amount: row.deductions_amount,
      net_payment: row.net_payment,
    }
  }));

  return formattedPayslips;
  },

  //get payslilp by month and year
  async getpayslipByMonth(user_id,month,year) {
    let sql = `SELECT 
sh.id as salary_id ,sh.user_id , e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.pan,
b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,t.template_name,
 sh.salary_date, sh.salary_template_id, sh.components, sh.total_salary, sh.gross_amount, sh.deductions_amount, sh.net_payment
FROM emp_salary_history sh
JOIN employee_tbl e on e.id =sh.employee_id
JOIN bank_details_tbl b ON  b.id =sh.bank_details_id
JOIN salary_templates t ON t.id = sh.salary_template_id 
where  sh.is_deleted = 0
AND MONTH(sh.salary_date) = ?
      AND YEAR(sh.salary_date) = ?`

    const params = [month, year];
    if(user_id){
       sql += ` AND sh.user_id = ?`;
       params.push(user_id);
    }

    const [result] = await pool.query(sql, params);
if (result.length === 0) {
      return { message: 'No payslip found for the given month and year.' };
    }
    // console.log("result",result)
    const formattedResponse = result.map(row => ({
  "Employee details": {
    name: row.name,
    employee_id: row.employee_id,
    Date_of_Joining: row.doj,
    department: row.department,
    designation: row.designation,
  },
  "Account details": {
    acc_holder_name: row.acc_holder_name,
    account_number: row.account_number,
    bank_name: row.bank_name,
    pan_number: row.pan,
    pf_account_number: row.pf_account_number,
    uan_number: row.uan_number
  },
  "Payslip details": {
    template_name: row.template_name,
    components: row.components
  },
  "Salary details": {
    salary_id: row.salary_id,
    salary_date: row.salary_date,
    salary: row.total_salary,
    gross_amount: row.gross_amount,
    deductions_amount: row.deductions_amount,
    net_payment: row.net_payment
  }
}));
return formattedResponse;
  },

  // create and update salary website
async checkSalaryHistory(user_id, start_date, end_date) {
  const sql = `
    SELECT * FROM emp_salary_history 
    WHERE user_id = ? AND is_deleted = 0 AND  salary_date BETWEEN ? AND ?
  `;
  const [rows] = await pool.query(sql, [user_id, start_date, end_date]);
  return rows.length > 0 ? rows[0] : null;
},

async deleteSalaryHistory(user_id, start_date, end_date) {
  const sql = `
    UPDATE emp_salary_history SET is_deleted = 1
    WHERE user_id = ?  AND salary_date BETWEEN ? AND ? `;
  await pool.query(sql, [user_id, start_date, end_date]);
},

  async createSalaryHistory(data) {
    const { user_id,
      employee_id,
      bank_details_id,
      salary_template_id,
      components,
      total_salary,
      gross_amount,
      deductions_amount,
      net_payment,
    } = data;

    const sql = `INSERT INTO emp_salary_history ( user_id, employee_id, bank_details_id, salary_template_id,
        components, total_salary, gross_amount, deductions_amount, net_payment ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
      user_id,
      employee_id,
      bank_details_id,
      salary_template_id,
      JSON.stringify(components),
      total_salary,
      gross_amount,
      deductions_amount,
      net_payment,
    ]
    const [result] = await pool.query(sql, values);
    return result;
  },

  async updateSalaryHistory(id, data) {
    const { user_id, employee_id, bank_details_id, salary_template_id, components,
      total_salary,
      gross_amount,
      deductions_amount,
      net_payment, } = data;


    const sql = `UPDATE emp_salary_history SET
        user_id = ?, employee_id = ?, bank_details_id = ?, salary_template_id = ?,
        components = ?, total_salary = ?, gross_amount = ?, deductions_amount = ?, net_payment = ?
       WHERE id = ?`
    const values = [user_id, employee_id, bank_details_id, salary_template_id,
      JSON.stringify(components), total_salary, gross_amount, deductions_amount, net_payment, id,]
    const [result] = await pool.query(sql, values);
    return result;
  },
  async getSalaryHistoyByUserId(id) {
    const sql = `SELECT 
e.id, e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.salary,e.pan,
b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,uan_number,
t.template_name,sh.components,sh.total_salary,sh.gross_amount,sh.deductions_amount,sh.net_payment
FROM emp_salary_history sh
join employee_tbl e on sh.user_id= e.user_id 
JOIN bank_details_tbl b ON e.id = b.employee_id
JOIN salary_templates t ON e.salary_template_id = t.id
where e.user_id = ? ; `
    const [result] = await pool.query(sql, [id])
    return result
  }

};

module.exports = salarySlipsModel;
