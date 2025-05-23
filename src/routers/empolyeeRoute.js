const express = require('express');

const EmployeeController = require('../controllers/empolyeeController');

const router = express.Router();

router.post('/employees/create-empolyee', EmployeeController.createEmployee);
router.get('/employees/get-empolyee-list', EmployeeController.getAllEmployees);
router.get('/employees/get-empolyee-id/:id', EmployeeController.getEmployeeById);
router.put('/employees/update-empolyee/:id', EmployeeController.updateEmployee);
router.patch('/employees/delete-empolyee/:id', EmployeeController.softDeleteEmployee);

module.exports = router;
