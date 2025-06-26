const employeeModel = require('../models/empolyeeModel');
const attendanceModel = require('../models/attendanceModel');

async function getAttendanceSummaryData(date) {
//   const dateObj = new Date(date || new Date());
  const allEmployees = await employeeModel.getAllEmployees();   
  const presentIds = await attendanceModel.getPresentEmployeeIds(date);

  const presentEmployees = allEmployees.filter(emp => presentIds.includes(emp.user_id));
  const absentEmployees = allEmployees.filter(emp => !presentIds.includes(emp.user_id));

  return {
    date: date,
    totalEmployees: allEmployees.length,
    presentCount: presentEmployees.length,
    absentCount: absentEmployees.length,
    presentEmployees,
    absentEmployees
  };
}
module.exports = { getAttendanceSummaryData };