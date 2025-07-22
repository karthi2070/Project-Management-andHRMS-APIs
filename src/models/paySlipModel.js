const pool = require('../config/db');
const attendanceModel = require('../models/attendanceModel');
const leaveModel = require('../models/leaveModel')

const salarySlipsModel = {

  async getAllComponentsByTemplateId(template_id) {
    const sql = `SELECT id, template_id, comp_name, type, percentage, applicable
                 FROM salary_components 
                 WHERE template_id = ? AND is_deleted = 0`;
    const [result] = await pool.query(sql, [template_id]);
    return result;
  },

async insertComponents(components) {
  const sql = `INSERT INTO salary_components 
    (template_id, comp_name, type, percentage, applicable) VALUES ?`;
  // Map into array of arrays
  const values = components.map(c => [
    c.template_id,
    c.comp_name,
    c.type,
    c.percentage,
    c.applicable
  ]);

  const [result] = await pool.query(sql, [values]);
  return { insert_id: result.insertId };
},

  async updateComponent(id, data) {
    const sql = `UPDATE salary_components
                 SET comp_name = ?, type = ?, percentage = ?, applicable = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE id = ? AND is_deleted = 0`;
    const values = [
      data.comp_name,
      data.type,
      data.percentage,
      data.applicable,
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
    const sql = `select t.id,t.template_name,t.total_percentage, c.id, c.template_id, c.comp_name, c.type, c.percentage, c.applicable 
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
        Comp_name: row.comp_name,
        Type: row.type,
        Percentage: row.percentage,
        Applicable: row.applicable
      }))
    };
    console.log(formattedResponse)
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


  async getEmployeePayslipData(user_id) {
    const sql = `
      SELECT 
        u.id as userId, e.id as employeeId, e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.salary,e.pan,
        b.id as bankId, b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,
        t.id as templateId, t.template_name,c.template_id,c.id as component_id,c.comp_name, c.type, c.percentage, c.applicable
      FROM employee_tbl e
      JOIN user_tbl u on e.user_id = u.id 
      JOIN bank_details_tbl b ON e.id = b.employee_id
      JOIN salary_templates t ON e.salary_template_id = t.id
      JOIN salary_components c ON t.id = c.template_id 
      WHERE u.id = ?;
    `;
    const [result] = await pool.query(sql, [user_id]);
    return result;
  },

  async insertSalaryHistory(values) {
    const query = `
      INSERT INTO emp_salary_history (
        user_id, employee_id, bank_details_id, salary_date, salary_template_id,
        components, total_salary, gross_amount, deductions_amount, net_payment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, values);
  },
  // get all payslilp 
async getpayslip(user_id) {
    const sql = `SELECT 
sh.user_id , e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.pan,
b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,t.template_name,
 sh.salary_date, sh.salary_template_id, sh.components, sh.total_salary, sh.gross_amount, sh.deductions_amount, sh.net_payment
FROM emp_salary_history sh
JOIN employee_tbl e on e.id =sh.employee_id
JOIN bank_details_tbl b ON  b.id =sh.bank_details_id
JOIN salary_templates t ON t.id = sh.salary_template_id 
where sh.user_id = ?`;

    const [result] = await pool.query(sql, [user_id]);
if (result.length === 0) {
      return { message: 'No payslip found for the given user id.' };
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
    const sql = `SELECT 
sh.user_id , e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.pan,
b.acc_holder_name, b.account_number,b.bank_name,b.pf_account_number,b.uan_number,t.template_name,
 sh.salary_date, sh.salary_template_id, sh.components, sh.total_salary, sh.gross_amount, sh.deductions_amount, sh.net_payment
FROM emp_salary_history sh
JOIN employee_tbl e on e.id =sh.employee_id
JOIN bank_details_tbl b ON  b.id =sh.bank_details_id
JOIN salary_templates t ON t.id = sh.salary_template_id 
where sh.user_id = ?
AND MONTH(sh.salary_date) = ?
      AND YEAR(sh.salary_date) = ?;`

    const [result] = await pool.query(sql, [user_id,month,year]);
if (result.length === 0) {
      return { message: 'No payslip found for the given month and year.' };
    }
    console.log(result)
    const formatedResponce = {
      "Employee details": {
        name: result[0].name,
        employee_id: result[0].employee_id,
        Date_of_Joining: result[0].doj,
        department: result[0].department,
        designation: result[0].designation,
      }, "Account details": {
        
        acc_holder_name: result[0].acc_holder_name,
        account_number: result[0].account_number,
        bank_name: result[0].bank_name,
        pan_number: result[0].pan,
        pf_account_number: result[0].pf_account_number,
        uan_number: result[0].uan_number
      }, "payslip details": {
    
        template_name: result[0].template_name,
        components: result[0].components,
      }, "salary_details": {
           salary_date: result[0].salary_date,
        salary: result[0].total_salary,
        gross_amount: result[0].gross_amount,
        deductions_amount: result[0].deductions_amount,
        net_payment: result[0].net_payment

      }
    }
    console.log(formatedResponce)
    return formatedResponce;
  },

  // create and update salary website

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
