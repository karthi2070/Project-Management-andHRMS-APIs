const Sprint = require("../models/sprintModel");

const SprintController = {
    async createSprint(req, res, next) {
        const data = req.body;

        try {
            const sprintId = await Sprint.createSprint(data);
            res.status(201).json({ message: "Sprint created successfully", sprint_id: sprintId });
        } catch (error) {
            next(error)
        }
    },

   async updateSprint(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log("Updating sprint with ID:", id, "and data:", updateData);

      const affectedRows = await Sprint.updateSprint(id, updateData);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Sprint not found or already deleted" });
      }

      res.status(200).json({ message: "Sprint updated successfully" });
    } catch (error) {
      next(error);
    }
  },

    async getSprints(req, res, next) {
        try {
            const sprints = await Sprint.getSprints();
            res.status(200).json(sprints);
        } catch (error) {
            next(error)
        }
    },

    async getSprintsByProjectId(req, res, next) {
        const { project_id } = req.params;
        try {
            const sprints = await Sprint.getSprintsByProjectId(project_id);
            if (sprints.length === 0) {
                return res.status(404).json({ message: "No sprints found for this project" });
            }
            res.status(200).json(sprints);
        } catch (error) {
            next(error)
        }
    },

    async getSprintById(req, res, next) {
        const { project_id, id } = req.params;
        try {
            const result = await Sprint.getSprintById(project_id, id);

            if (!result) {
                return res.status(404).json({ message: "Sprint not found" });
            }

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },

    async deleteSprint(req, res, next) {
        try {
            const {id}=req.params
            if (!id ){
                res.status(400).json({message: "Sprint id not found"})
            }
            const result=await Sprint.deleteSprint(id);
            res.status(200).json({ message: "Sprint deleted successfully",result:result });
        } catch (error) {
            next(error)
        }
    }
};

module.exports = SprintController;
