const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendanceController');

router.post('/attendance/create', attendanceController.createAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.get('/', attendanceController.getAllAttendance);

module.exports = router;
