const express = require('express');
const router = express.Router();
const holidaysController = require('../controllers/holidayController');

router.post('/holidays/create-holiday', holidaysController.createHoliday);
router.get('/holidays/get-all-holiday', holidaysController.getAllHolidays);
router.get('/holidays/get-by-holiday/:id', holidaysController.getHolidayById);
router.put('/holidays/update-holiday/:id', holidaysController.updateHoliday);
router.delete('/holidays/delete-holiday/:id', holidaysController.deleteHoliday);

module.exports = router;
