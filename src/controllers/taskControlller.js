const taskModel = require('../models/taskModel');

const taskController = {
  // Create Task
  async createTask(req, res, next) {
    try {
      const data = req.body;

      const task = await taskModel.createTask(data);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error)

    }
  },

  async getAllTasksBySprintId(req, res, next) {
    try {
      const {sprint_id} = req.params;
      if (!sprint_id) {
        return res.status(400).json({ success: false, message: 'Sprint ID is required' });
      }
      const tasks = await taskModel.getAllTasksBySprintId(sprint_id);
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ success: false, message: 'No tasks found for this sprint' });
      }
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },
    async getAllTasksByProjectId(req, res, next) {
    try {
      const {project_id} = req.params;
      if (!project_id) {
        return res.status(400).json({ success: false, message: 'Sprint ID is required' });
      }
      const tasks = await taskModel.getAllTasksByProjectId(project_id);
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ success: false, message: 'No tasks found for this sprint' });
      }
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  // Get Task by ID
  async getTaskById(req, res, next) {
    try {
      const {sprint_id,task_id} = req.params;
      const task = await taskModel.getTaskById(sprint_id,task_id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },
    async getSubTasks(req, res, next) {
    try {
      const id = req.params.id;
      const subTasks = await taskModel.getSubTasks(id);
      res.status(200).json({ success: true, data: subTasks });
    } catch (error) {
      next(error);
    }
  },

    async updateTask(req, res, next) {
        try {
            const { id } = req.params;
            const taskData = req.body;

            const result = await taskModel.updateTask(id, taskData);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found or no changes made' });
            }

            res.status(200).json({ message: 'Task updated successfully', taskId: id });
        } catch (error) {
            next(error);
        }
    },


  // Delete Task (Soft Delete)
  async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const deleted = await taskModel.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Task not found or not deleted' });
      }
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = taskController;
