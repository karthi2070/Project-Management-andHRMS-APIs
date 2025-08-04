const express = require("express");
const router = express.Router();
const {createProject, updateProject, getProjects, getProjectById} = require("../controllers/projectController");

router.post("/create-project", createProject);
router.put("/update-project/:id",updateProject);
router.get("/get-all-projects", getProjects);
router.get("/get-by-id/:project_id", getProjectById);

module.exports = router;
