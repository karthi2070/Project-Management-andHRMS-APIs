const pool = require('../config/db');
const attendanceModel =require('../models/attendanceModel')

const salarySlipsModel = {

  async getAllComponentsByTemplateId(id) {
    const sql = `SELECT id, template_id, comp_name, type, percentage, applicable
                 FROM salary_components 
                 WHERE template_id = ? AND is_deleted = 0`;
    const values = [id];
    const [result] = await pool.query(sql, values);
    return result;
  },

  async insertComponents(components) {
    const sql = `INSERT INTO salary_components 
      ( template_id, comp_name, type, percentage, applicable) VALUES ?`;

    const values = components.map(c => [ c.template_id,
      c.comp_name,
      c.type,
      c.percentage,
      c.applicable
    ]);

    const [result] = await pool.query(sql, [values]);
    return { affectedRows: result.affectedRows };
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

  async insertTemplate(template_name, total_percentage) {
    const sql = `INSERT INTO salary_templates ( template_name, total_percentage)
                 VALUES ( ?, ?)`;
    const values = [template_name,total_percentage];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

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

  //get payslilp
  async getgenpayslip(startDate, endDate, id){
    const sql =` SELECT 
e.id, e.employee_id,e.name, e.department,e.mail,e.designation,e.doj,e.salary,e.pan, b.acc_holder_name, b.account_number,b.bank_name,
b.pf_account_number,uan_number,
  t.template_name,c.template_id,c.comp_name, c.type, c.percentage, c.applicable
FROM employee_tbl e
JOIN bank_details_tbl b ON e.id = b.employee_id
JOIN salary_templates t ON e.payslip_id = t.id
JOIN salary_components c ON t.id = c.template_id 
where e.id = ?;  `

        const [result] = await pool.query(sql, [id]);
      const {earnings,deductions } =result.reduce((acc,crr)=>{
        if (crr.type ==1 ) acc.earnings +=crr.percentage;

      else if(crr.type ==0)acc.deductions +=crr.percentage
      return acc ;
    },{earnings:0,deductions:0})
    
        const totalPercentage = earnings + deductions;
    if (totalPercentage > 100) {
      throw new Error("Total percentage exceeds 100%");
    }

//   function getTotalDays(start, end) {
//   const startDate = new Date(start);
//   const endDate = new Date(end);
//   return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
// }

// const totalDays = getTotalDays(startDate, endDate);
// const totalDaysPresent = totalDays - (present_days + permission_leaves);

    const attendance= await attendanceModel.getTotalWorkingDays(startDate, endDate, id);
    console.log(attendance,attendance[0].total_working_days)

    

console.log({earnings,deductions})
console.log(result)
const salary = result[0].salary;
        const formatedResponce ={
          "Employee details":{
            name :result[0].name,
            employee_id: result[0].employee_id,
            Date_of_Joining : result[0].doj,
            department: result[0].department,
            mail: result[0].mail,
            designation: result[0].designation,
            working_days: attendance[0].total_working_days,
            pan_number:result[0].pan,
            acc_holder_name: result[0].acc_holder_name,
            account_number: result[0].account_number,
            bank_name:result[0].bank_name,
            pf_account_number:result[0].pf_account_number,
            uan_number:result[0].uan_number
          },"payslip deatils":{
            salary:result[0].salary,
            template_name: result[0].template_name,
            components: result.map(row => ({
              comp_name: row.comp_name,
              type: row.type,
              percentage: row.percentage,
             salary_percentage: (salary * row.percentage)/100,
              applicable: row.applicable
            }))
          },"salary_details": {
              gross_amount:(salary*earnings)/100,
              deductions_amount:(salary*deductions)/100,
              net_paymnet:(salary*totalPercentage)/100

            }
        }
    return formatedResponce ;
  }


};

module.exports = salarySlipsModel;
