const express = require('express');
const router = express.Router();
const {
    createAttendance,updateAttendance,
    getAllAttendance,getAttendanceById,getAttendanceByEmployeeId,getAttendanceByDate
} = require('../controllers/attendanceController');

router.post('/attendance/create-attendance',createAttendance);
router.put('/attendance/update-attendance/:id',updateAttendance);
router.get('/attendance/get-attendance-list', getAllAttendance);
router.get('/attendance/get-attendance-id/:id', getAttendanceById);
router.get('/attendance/get-attendance-emp-id/:id',getAttendanceByEmployeeId);
router.get('/attendance/filter-by-date', getAttendanceByDate);

module.exports = router;
