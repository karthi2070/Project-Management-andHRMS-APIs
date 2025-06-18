const express = require("express");
const router = express.Router();
const EmployeeLeaveController = require("../controllers/leaveController");

router.post("/employee-leave/create-leave", EmployeeLeaveController.create);
router.get("/employee-leave/get-all-leave", EmployeeLeaveController.getAll);
router.get("/employee-leave/get-employee-leave/:id/:is_applicable", EmployeeLeaveController.getemployeeLeaves);
router.get("/employee-leave/get-leave-id/:id", EmployeeLeaveController.getById);
router.put("/employee-leave/update-leave/:id", EmployeeLeaveController.update);
router.patch("/employee-leave/delete-leave/:id", EmployeeLeaveController.softDelete);
router.patch("/employee-leave/:id/is_applicable", EmployeeLeaveController.updateApplicable);

// leave balance tracking

router.post("/employee-leave/create-leave-balance", EmployeeLeaveController.createLeaveBalance);
router.get("/employee-leave/get-all-leave-balance", EmployeeLeaveController.getAll);
router.get("/employee-leave/get-by-userId-leave-balance/:userId", EmployeeLeaveController.getLeaveByUserId);
router.put("/employee-leave/update-leave-balance/:id", EmployeeLeaveController.updateLeaveBalance);
router.get("/employee-leave/summary/:userId", EmployeeLeaveController.getLeaveSummary);


module.exports = router;