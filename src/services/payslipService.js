const PayslipModel = require("../models/paySlipModel");
const attendanceModel = require("../models/attendanceModel");
const leaveModel = require("../models/leaveModel");

const PayslipService = {
  async genpaySlip(user_id, start_date, end_date) {
   

      const result = await PayslipModel.getEmployeePayslipData(user_id);

      const { earnings, deductions } = result.reduce((acc, crr) => {
        if (crr.type == 1) acc.earnings += crr.percentage;
        else if (crr.type == 2) acc.deductions += crr.percentage;
        return acc;
      }, { earnings: 0, deductions: 0 });

      const total_percentage = earnings + deductions;
      if (total_percentage > 100) {
        throw new Error("Total percentage exceeds 100%");
      }

      function getTotalDays(start_date, end_date) {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      }

      const attendance = await attendanceModel.getTotalWorkingDays(start_date, end_date, user_id);
      const total_days_present = attendance.length ? Number(attendance[0].total_working_days) : 0;

      const leave = await leaveModel.getUserLeavesByDateRange(user_id, start_date, end_date);
      const pay_leave = leave.length ? Number(leave[0].leave_days) : 0;

      const totalDays = getTotalDays(start_date, end_date);
      const totalDaysAbsent = totalDays - (total_days_present + parseInt(pay_leave));
      const salary = Number(result[0].salary);
      const per_day_amount = salary / totalDays;
      const absent_days_deductions = per_day_amount * totalDaysAbsent;

      const gross_amount = (salary * earnings) / 100;
      const deductions_amount = (salary * deductions) / 100; 
      const net_paymnet = salary - (deductions_amount+absent_days_deductions);

      console.log(net_paymnet)

      const components = result.map(row => ({
        component_id: row.component_id,
        component_name: row.comp_name,
        type: row.type,
        percentage: row.percentage,
        salary_amount: (salary * row.percentage) / 100,
        applicable: row.applicable
      }));

      const toDayDate = new Date();
      const values = [
        result[0].userId, result[0].employeeId, result[0].bankId,
        toDayDate, result[0].templateId, JSON.stringify(components),
        salary, gross_amount, deductions_amount, net_paymnet
      ];

      await PayslipModel.insertSalaryHistory(values);

      const formatedResponce = {
        "Employee details": {
          name: result[0].name,
          employee_id: result[0].employee_id,
          Date_of_Joining: result[0].doj,
          department: result[0].department,
          mail: result[0].mail,
          designation: result[0].designation,
        },
        "Account Details": {
          pan_number: result[0].pan,
          acc_holder_name: result[0].acc_holder_name,
          account_number: result[0].account_number,
          bank_name: result[0].bank_name,
          pf_account_number: result[0].pf_account_number,
          uan_number: result[0].uan_number
        },
        "Attendance Details": {
          total_working_days: totalDays,
          total_days_present: total_days_present,
          total_pay_leave: pay_leave,
          totalDaysAbsent: totalDaysAbsent,
        },
        "payslip deatils": {
          salary: result[0].salary,
          template_name: result[0].template_name,
          components: result.map(row => ({
            comp_name: row.comp_name,
            type: row.type,
            percentage: row.percentage,
            salary_amount: (salary * row.percentage) / 100,
            applicable: row.applicable
          }))
        },
        "salary_details": {
          gross_amount: gross_amount,
          deductions_amount: deductions_amount,
          net_paymnet: net_paymnet
        }
      };

      return formatedResponce;

    
  }
};

module.exports = PayslipService;
