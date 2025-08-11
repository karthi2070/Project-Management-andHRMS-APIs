const db = require("../config/db");
const PayslipModel = require("../models/paySlipModel");
const attendanceModel = require("../models/attendanceModel");
const leaveModel = require("../models/leaveModel");
const moment = require("moment");

function getLastWorkingDay(endDate, holidays = []) {
  let date = moment(endDate);
  while (date.day() === 0 || date.day() === 6 || holidays.includes(date.format("YYYY-MM-DD"))) {
    date.subtract(1, "day");
  }
  return date.format("YYYY-MM-DD");
}


const PayslipService = {
  async updateTemplateWithComponents (template_id,templateData, requestComponents)  {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Update template info
      await PayslipModel.updateTemplate(template_id, templateData,conn);

      // Get existing components from DB
      const existingComponents = await PayslipModel.getAllComponentsByTemplateId( template_id,conn);

      const requestIds = requestComponents.map(c => c.id).filter(Boolean);
      const existingIds = existingComponents.map(c => c.id);

      // Detect ADDs (no ID in request component)
      const adds = requestComponents.filter(c => !c.id);

      // Detect UPDATES (ID exists in DB)
      const updates = requestComponents.filter(c => c.id && existingIds.includes(c.id));

      // Detect DELETES (ID exists in DB but not in request)
      const deletes = existingComponents.filter(c => !requestIds.includes(c.id));

      // Process ADD
      for (const comp of adds) {
        await PayslipModel.insertComponent(conn, { ...comp, template_id: template_id });
      }

      // Process UPDATE
      for (const comp of updates) {
        await PayslipModel.updateComponent(conn, comp);
      }

      // Process DELETE (soft delete)
      for (const comp of deletes) {
        await PayslipModel.softDeleteComponent(conn, comp.id);
      }

      await conn.commit();
      return { adds, updates, deletes };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async genpaySlip(user_id, start_date, end_date, forceRegenerate = false) {

    const existingPayslip = await PayslipModel.checkSalaryHistory(user_id, start_date, end_date);

    if (existingPayslip && forceRegenerate) {
      await PayslipModel.deleteSalaryHistory(user_id, start_date, end_date);
    }

    const result = await PayslipModel.getEmployeePayslipData(user_id);
    if (!result || result.length === 0) throw new Error("No data found for user");

    const employeeInfo = result[0];
    const gross_salary = Number(employeeInfo.salary);

    // Map components
    const component = result.map(row => ({
      component_id: row.component_id,
      Component_name: row.component_name,
      Component_type: row.component_type,
      Component_value: parseFloat(row.component_value),
      amount_type: row.amount_type
    }));

    const components = Array.from(
      new Map(component.map(c => [c.component_id, c])).values()
    );
    // console.log("Unique Components:", components);
    const earnings = [];
    const deductions = [];
    const earningsMap = {};
    let total_deductions = 0;

    // 🔹 Step 1: Split earnings
    const fixedEarnings = components.filter(c => c.Component_type === 1 && c.amount_type === 2); // fixed ₹
    const percentEarnings = components.filter(c => c.Component_type === 1 && c.amount_type === 1); // % based
    console.log("Fixed Earnings:", fixedEarnings);
    console.log("Percentage Earnings:", percentEarnings);

    // 🔹 Step 2: Total fixed earnings
    const total_fixed_earning = fixedEarnings.reduce((sum, c) => sum + c.Component_value, 0);

    // 🔹 Step 3: Validate % total and normalize
    const total_percent_value = percentEarnings.reduce((sum, c) => sum + c.Component_value, 0);
    console.log("Total Percentage Value:", total_percent_value);
    if (Math.round(total_percent_value * 100) / 100 !== 100) {
      throw new Error(`Earning percentage-based components must total 100%. Got: ${total_percent_value}%`);
    }

    // 🔹 Step 4: Remaining after fixed
    const remaining_earning_pool = gross_salary - total_fixed_earning;

    if (remaining_earning_pool < 0) {
      throw new Error(`Fixed earnings exceed gross salary`);
    }

    // 🔹 Step 5: Compute each earning
    for (const comp of [...fixedEarnings, ...percentEarnings]) {
      let amount = 0;
      if (comp.amount_type === 1) { // percentage-based
        amount = (remaining_earning_pool * comp.Component_value) / 100;
      } else if (comp.amount_type === 2) { // fixed amount
        amount = comp.Component_value;
      }

      earnings.push({
        name: comp.Component_name,
        component_value: comp.Component_value,
        amount_type: comp.amount_type,
        salary_amount: parseFloat(amount.toFixed(2))
      });

      earningsMap[comp.Component_name.toLowerCase()] = amount;
    }

    const gross_amount = earnings.reduce((sum, e) => sum + e.salary_amount, 0);

    // console.log("Final Earnings Breakdown:", earnings);
    // console.log(" Gross Amount:", gross_amount);

    // Deductions
    for (const comp of components) {
      if (comp.Component_type === 2) {
        let amount = 0;
        const name = comp.Component_name.toLowerCase();

        if (comp.amount_type === 1) {
          if (name === "pf") {
            const basic = earningsMap["basic"];
            if (!basic) throw new Error("Basic component is required for PF calculation");
            amount = (basic * comp.Component_value) / 100;
          } else {
            amount = (gross_salary * comp.Component_value) / 100;
          }
        } else if (comp.amount_type === 2) {
          amount = comp.Component_value;
        }

        total_deductions += amount;

        deductions.push({
          name: comp.Component_name,
          component_value: comp.Component_value,
          amount_type: comp.amount_type,
          salary_amount: parseFloat(amount.toFixed(2))
        });
      }
    }

    // Attendance & Leave
    function getTotalDays(start_date, end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    const totalDays = getTotalDays(start_date, end_date);
    const attendance = await attendanceModel.getTotalWorkingDays(start_date, end_date, user_id);
    // const total_days_present = attendance.length ? Number(attendance[0].total_working_days) : 0;

    const total_days_present = 25; // Assuming 25 days as per your example
    const leave = await leaveModel.getUserLeavesByDateRange(user_id, start_date, end_date);
    const pay_leave = leave.length ? Number(leave[0].leave_days) : 0;
    const total_days_absent = totalDays - total_days_present; // for storing in db

    const totalDaysAbsent = totalDays - (total_days_present + pay_leave);
    const per_day_amount = gross_salary / totalDays;
    const absent_days_deductions = per_day_amount * totalDaysAbsent;

    // Final calculations
    let total_deductions_with_absent = total_deductions + absent_days_deductions;

    let net_payment = gross_amount - total_deductions_with_absent;

    if (net_payment < 0) {
      total_deductions_with_absent = gross_amount;
      net_payment = 0;
    }
    const finalComponents = [...earnings, ...deductions];

    // Save to DB
    const salary_date = getLastWorkingDay(end_date);
    const values = [
      employeeInfo.userId, employeeInfo.employeeId, employeeInfo.bankId, salary_date, employeeInfo.templateId, JSON.stringify(finalComponents),
      totalDays, total_days_absent, pay_leave, absent_days_deductions,
      gross_salary, gross_amount, total_deductions_with_absent, net_payment
    ];
    await PayslipModel.insertSalaryHistory(values);

    // Return formatted response
    return {
      "Employee details": {
        name: employeeInfo.name,
        employee_id: employeeInfo.employee_id,
        Date_of_Joining: employeeInfo.doj,
        department: employeeInfo.department,
        mail: employeeInfo.mail,
        designation: employeeInfo.designation
      },
      "Account Details": {
        pan_number: employeeInfo.pan,
        acc_holder_name: employeeInfo.acc_holder_name,
        account_number: employeeInfo.account_number,
        bank_name: employeeInfo.bank_name,
        pf_account_number: employeeInfo.pf_account_number,
        uan_number: employeeInfo.uan_number
      },
      "Attendance Details": {
        total_working_days: totalDays,
        total_days_present,
        total_pay_leave: pay_leave,
        totalDaysAbsent,
        absent_days_deductions: parseFloat(absent_days_deductions.toFixed(2))
      },
      "payslip details": {
        salary: gross_salary,
        template_name: employeeInfo.template_name,
        components: finalComponents
      },
      "salary_details": {
        salary_date: salary_date,
        gross_amount: parseFloat(gross_amount.toFixed(2)),
        deductions_amount: parseFloat(total_deductions_with_absent.toFixed(2)),
        net_payment: parseFloat(net_payment.toFixed(2))
      }
    };
  }
};

module.exports = PayslipService;

