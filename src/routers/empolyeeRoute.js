const express = require('express');

const EmployeeController = require('../controllers/empolyeeController');

const router = express.Router();

router.post('/create-empolyee', EmployeeController.createEmployee);
router.get('/get-empolyee-list', EmployeeController.getAllEmployees);
router.get('/get-empolyee-pkid/:id', EmployeeController.getEmployeeById);
router.get('/get-empolyee-user-id/:user_id', EmployeeController.getEmployeeByUserId);
router.put('/update-empolyee/:id', EmployeeController.updateEmployee);
router.put('/Relieving-empolyee/:id', EmployeeController.relievingEmployee);// Relieving Employee API
router.get('/get-filtered-department', EmployeeController.getFilteredDepartment);
router.get('/search-empolyee', EmployeeController.searchEmployee);
router.get('/get-empolyee-sort', EmployeeController.getSortByEmployee);
router.get('/get-by-empid/:employee_id', EmployeeController.getEmployeeByEmpId);
router.patch('/update-empolyee-status/:id', EmployeeController.employeeStatus);
router.patch('/delete-empolyee/:id', EmployeeController.softDeleteEmployee);


// Bank Details Routes
router.post('/bank/create-acc', EmployeeController.createBankDetails);
router.get('/bank/get-acc-list', EmployeeController.getAllBankDetails);
router.get('/bank/get-acc-emp-id/:id', EmployeeController.getBankDetailsById);
router.put('/bank/update-acc-emp-id/:employee_id', EmployeeController.updateBankDetailsByEmployeeId);
router.put('/bank/update-acc-id/:id', EmployeeController.updateBankDetailsById);
router.patch('/bank/delete-acc-emp-id/:id', EmployeeController.softDeleteBankDetails);


module.exports = router;
