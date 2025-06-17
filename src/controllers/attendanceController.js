const attendanceModel = require('../models/attendanceModel');

exports.createAttendance = async (req, res, next) => {
    try {
        const result = await attendanceModel.createAttendance(req.body);
        res.status(201).json({ message: 'Attendance created successfully', data: result });
    } catch (error) {
next(error);
    }
};

exports.updateAttendance = async (req, res, next) => {
    try {
        const result = await attendanceModel.updateAttendance(req.params.id, req.body);
        res.status(200).json({ message: 'Attendance updated successfully', data: result });
    } catch (error) {
        next(error);
    }
};

exports.getAllAttendance = async (req, res, next) => {
    try {
        const result = await attendanceModel.getAllAttendance();
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

exports.getAttendanceById = async (req, res, next) => {
    try {
        const result = await attendanceModel.getAttendanceById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Attendance not found' });
        }
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

exports.getAttendanceByEmployeeId = async (req, res, next) => {
    try {
        const result = await attendanceModel.getAttendanceByEmployeeId(req.params.id);
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this employee' });
        }
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }};

    exports.getAttendanceByDate = async (req, res,next) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date query parameter is required' });
        }

        const records = await attendanceModel.getAttendanceByDate(date);

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this date' });
        }

        res.status(200).json({ data: records });
    } catch (error) {
        next(error);
    }
};

exports.getTotalWorkingDays = async (req, res,next) => {

  try {
    const rows = await attendanceModel.getTotalWorkingDays();
    res.status(200).json(rows);
  } catch (error) {
next(error)
  }
};


