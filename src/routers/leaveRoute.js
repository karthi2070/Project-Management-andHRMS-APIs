const express = require("express");
const router = express.Router();
const EmployeeLeaveController = require("../controllers/leaveController");

router.post("/employee-leave/create-leave", EmployeeLeaveController.create);
router.get("/employee-leave/get-all-leave", EmployeeLeaveController.getAll);
router.get("/employee-leave/get-leave-id/:id", EmployeeLeaveController.getById);
router.put("/employee-leave/update-leave/:id", EmployeeLeaveController.update);
router.patch("employee-leave/delete-leave/:id", EmployeeLeaveController.softDelete);
router.patch("/employee-leave/:id/is_applicable", EmployeeLeaveController.updateApplicable);

module.exports = router;