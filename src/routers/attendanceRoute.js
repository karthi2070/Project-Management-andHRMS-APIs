const express = require('express');
const router = express.Router();
const {
    createAttendance,updateAttendance,
    getAllAttendance,getAttendanceById,getAttendanceByUserId,getAttendanceSummary,getAttendanceByDate,getTotalWorkingDays
} = require('../controllers/attendanceController');

router.post('/create-attendance',createAttendance);
router.put('/update-attendance/:id',updateAttendance);
router.get('/get-attendance-list', getAllAttendance);
router.get('/get-attendance-id/:id', getAttendanceById);
router.get('/get-attendance-user-id/:userId',getAttendanceByUserId);
router.get('/filter-by-date', getAttendanceByDate);
router.get('/working-days-count', getTotalWorkingDays);
router.get('/attendance-summary',getAttendanceSummary);

module.exports = router;

