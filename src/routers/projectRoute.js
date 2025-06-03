const express = require("express");
const router = express.Router();
const {createProject, updateProject, getProjects, getProjectById} = require("../controllers/projectController");

router.post("/projects/create-project", createProject);
router.put("/projects/update-project/:id",updateProject);
router.get("/projects/get-all-projects", getProjects);
router.get("/api/v1/projects/get-by-id/:project_id", getProjectById);

module.exports = router;
