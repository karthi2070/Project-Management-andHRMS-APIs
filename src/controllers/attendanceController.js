const attendanceModel = require('../models/attendanceModel');
const employeeModel =require('../models/empolyeeModel')

const AttendanceController = {

  async getAttendanceSummary  (req,res,next) {
     try {
      const { date } = req.query;
      if (!date) return res.status(400).json({ success: false, message: 'Date is required' });
const Employees = await employeeModel.getAllEmployees();

const allEmployees = Employees.map(emp => ({user_id: emp.user_id,name: emp.name}));

console.log(allEmployees);

    const presentIds = await attendanceModel.getPresentEmployeeIds(date);

    const presentEmployees = allEmployees.filter(emp => presentIds.includes(emp.user_id));
    const absentEmployees = allEmployees.filter(emp => !presentIds.includes(emp.user_id));

    const data= {
      date,
      totalEmployees: allEmployees.length,
      presentCount: presentEmployees.length,
      absentCount: absentEmployees.length,
      presentEmployees,
      absentEmployees }
      res.status(200).json({ success: true,data });
    
}catch(error)
{next(error)}
  },

async createAttendance (req, res, next)  {
    try {
        const result = await attendanceModel.createAttendance(req.body);
        res.status(201).json({ message: 'Attendance created successfully', data: result });
    } catch (error) {
        next(error);
    }
},
async updateAttendance (req, res, next) {
    try {
        const result = await attendanceModel.updateAttendance(req.params.id, req.body);
        res.status(200).json({ message: 'Attendance updated successfully', data: result });
    } catch (error) {
        next(error);
    }
},
async getAllAttendance (req, res, next)  {
    try {
        const result = await attendanceModel.getAllAttendance();
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
},
async getAttendanceById (req, res, next)  {
    try {
        const result = await attendanceModel.getAttendanceById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Attendance not found' });
        }
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
},
async getAttendanceByUserId (req, res, next)  {
    try {
        const result = await attendanceModel.getAttendanceByUserId(req.params.userId);
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this employee' });
        }
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
},
 async getAttendanceByDate (req, res, next) {
    try {
        const { start_date, end_date } = req.query;

        if (!start_date && !end_date) {
            return res.status(400).json({ message: 'Date query parameter is required' });
        }

        const records = await attendanceModel.getAttendanceByDate(start_date, end_date);

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this date' });
        }

        res.status(200).json({ data: records });
    } catch (error) {
        next(error);
    }
},
 async getTotalWorkingDays (req, res, next)  {

    try {
        const rows = await attendanceModel.getTotalWorkingDays();
        res.status(200).json(rows);
    } catch (error) {
        next(error)
    }
}
};

module.exports = AttendanceController;


