const express = require('express');
const router = express.Router();
const holidaysController = require('../controllers/holidayController');

router.post('/create-holiday', holidaysController.createHoliday);
router.get('/get-all-holiday', holidaysController.getAllHolidays);
router.get('/get-by-holiday/:id', holidaysController.getHolidayById);
router.put('/update-holiday/:id', holidaysController.updateHoliday);
router.patch('/delete-holiday/:id', holidaysController.deleteHoliday);

module.exports = router;
