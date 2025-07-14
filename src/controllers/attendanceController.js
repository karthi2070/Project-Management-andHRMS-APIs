const attendanceModel = require('../models/attendanceModel');
const employeeModel =require('../models/empolyeeModel')
const { getAttendanceSummaryData } = require('../helper/attedanceDashboard');


const AttendanceController = {
async  getAttendanceSummary(req, res, next) {
  try {
    const date = req.body || new Date()
    if (!date) return res.status(400).json({ success: false, message: 'Date is required' });

    const data = await getAttendanceSummaryData(date);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
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
            const { startDate, endDate, id } = req.query;

    if (!startDate && !endDate && !user_id) {
      return res.status(400).json({ message: "user_id,startDate and endDate are required." });
    }
        const rows = await attendanceModel.getTotalWorkingDays(startDate, endDate, id);
        res.status(200).json(rows);
    } catch (error) {
        next(error)
    }
}
};

module.exports = AttendanceController;


