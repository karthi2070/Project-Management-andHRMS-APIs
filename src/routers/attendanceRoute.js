const express = require('express');
const router = express.Router();
const {
    createAttendance,updateAttendance,
    getAllAttendance,getAttendanceById,getAttendanceByUserId,getAttendanceSummary,getAttendanceByDate,getTotalWorkingDays
} = require('../controllers/attendanceController');

router.post('/attendance/create-attendance',createAttendance);
router.put('/attendance/update-attendance/:id',updateAttendance);
router.get('/attendance/get-attendance-list', getAllAttendance);
router.get('/attendance/get-attendance-id/:id', getAttendanceById);
router.get('/attendance/get-attendance-user-id/:userId',getAttendanceByUserId);
router.get('/attendance/filter-by-date', getAttendanceByDate);
router.get('/attendance/working-days-count', getTotalWorkingDays);
router.get('/attendance/attendance-summary',getAttendanceSummary);

module.exports = router;

