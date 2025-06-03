const express = require("express");
const router = express.Router();
const SprintController = require("../controllers/sprintController");

router.post("/sprints/create-sprints", SprintController.createSprint);
router.put("/sprints/update-sprints/:id", SprintController.updateSprint);
router.get("/sprints/get-all-sprints", SprintController.getSprints);
router.get("/sprints/get-by-id/:id", SprintController.getSprintById);
router.patch("/sprints/delete-sprints/:id", SprintController.deleteSprint);
router.get("/sprints/get-by-project/:project_id", SprintController.getSprintsByProjectId);
module.exports = router;
