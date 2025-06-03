const Project = require("../models/projectModel");

const createProject = async (req, res) => {
    try {
        const data = req.body;
        const projectId = await Project.createProject(data);
        res.status(201).json({ message: "Project created successfully", project_id: projectId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        console.log("Updating project with ID:", id, "and data:", updateData);
        await Project.updateProject(id, updateData);
        res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { project_id } = req.params;
        const project = await Project.getProjectById(project_id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProject, updateProject, getProjects, getProjectById };
