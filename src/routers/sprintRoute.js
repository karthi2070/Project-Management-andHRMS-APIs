const express = require("express");
const router = express.Router();
const SprintController = require("../controllers/sprintController");

router.post("/create-sprint", SprintController.createSprint);
router.put("/update-sprint/:id", SprintController.updateSprint);
router.get("/get-by-project/:project_id", SprintController.getSprintsByProjectId);
router.get("/get-by-id/:project_id/:id", SprintController.getSprintById);
router.patch("/delete-sprint/:id", SprintController.deleteSprint);
// router.get("/sprints/get-all-sprints", SprintController.getSprints);
module.exports = router;
