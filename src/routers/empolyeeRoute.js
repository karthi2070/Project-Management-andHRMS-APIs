const express = require('express');

const EmployeeController = require('../controllers/empolyeeController');

const router = express.Router();

router.post('/employees/create-empolyee', EmployeeController.createEmployee);
router.get('/employees/get-empolyee-list', EmployeeController.getAllEmployees);
router.get('/employees/get-empolyee-id/:id', EmployeeController.getEmployeeById);
router.put('/employees/update-empolyee/:id', EmployeeController.updateEmployee);
router.patch('/employees/delete-empolyee/:id', EmployeeController.softDeleteEmployee);
router.get('/employees/get-filtered-department', EmployeeController.getFilteredDepartment);
router.get('/employees/search-empolyee', EmployeeController.searchEmployee);
router.patch('/employees/update-empolyee-status/:id', EmployeeController.employeeStatus);
router.get('/employees/get-empolyee-sort', EmployeeController.getSortByEmployee);

// Bank Details Routes
router.post('/bank/create-acc', EmployeeController.createBankDetails);
router.get('/bank/get-acc-list', EmployeeController.getAllBankDetails);
router.get('/bank/get-acc-id-em-id/:id', EmployeeController.getBankDetailsById);
router.put('/bank/update-acc-em-id/:id', EmployeeController.updateBankDetails);
router.patch('/bank/delete-acc-em-id/:id', EmployeeController.softDeleteBankDetails);


module.exports = router;
