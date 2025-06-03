const Sprint = require("../models/sprintModel");

const SprintController = {
    async createSprint(req, res) {
        const data= req.body;

        try {
            const sprintId = await Sprint.createSprint(data);
            res.status(201).json({ message: "Sprint created successfully", sprint_id: sprintId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateSprint(req, res) {
        const { sprint_id } = req.params;
        const updateData = req.body;
        try {
            await Sprint.updateSprint(sprint_id, updateData);
            res.status(200).json({ message: "Sprint updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSprints(req, res) {
        try {
            const sprints = await Sprint.getSprints();
            res.status(200).json(sprints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSprintById(req, res) {
       // const id  = req.params;
        console.log("Fetching sprint with ID:", req.params);
        try {
            const sprint = await Sprint.getSprintById(req.params);
            // if (!sprint) {
            //     return res.status(404).json({ message: "Sprint not found" });
            // }
            res.status(200).json(sprint);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getSprintsByProjectId(req, res) {
        const { project_id } = req.params;
        try {
            const sprints = await Sprint.getSprintsByProjectId(project_id);
            if (sprints.length === 0) {
                return res.status(404).json({ message: "No sprints found for this project" });
            }
            res.status(200).json(sprints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteSprint(req, res) {
        // const { sprint_id } = req.params;
        try {
            await Sprint.deleteSprint(req.params);
            res.status(200).json({ message: "Sprint deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = SprintController;
