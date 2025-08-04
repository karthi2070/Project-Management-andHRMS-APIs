const express = require("express");
const router = express.Router();
const EmployeeLeaveController = require("../controllers/leaveController");

router.post("/create-leave", EmployeeLeaveController.create);
router.get("/get-all-leave", EmployeeLeaveController.getAll);
router.get("/get-employee-leave/:id/:is_applicable", EmployeeLeaveController.getemployeeLeaves);
router.get("/get-leave-id/:id", EmployeeLeaveController.getById);
router.put("/update-leave/:id", EmployeeLeaveController.update);
router.patch("/delete-leave/:id", EmployeeLeaveController.softDelete);
router.patch("/update-applicable/:id", EmployeeLeaveController.updateApplicable);

// leave balance tracking

router.post("/create-leave-balance", EmployeeLeaveController.createLeaveBalance);
router.get("/get-all-leave-balance", EmployeeLeaveController.getAllLeaveBalances);
router.get("/get-by-userId-leave-balance/:userId", EmployeeLeaveController.getLeaveByUserId);
router.put("/update-leave-balance/:id", EmployeeLeaveController.updateLeaveBalance);
router.get("/summary/:userId", EmployeeLeaveController.getLeaveSummary);


module.exports = router;