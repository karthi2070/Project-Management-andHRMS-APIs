const taskModel = require('../models/taskModel');

const taskController = {
  // Create Task
  async createTask(req, res, next) {
    try {
      const data = req.body;

      const task = await taskModel.createTask(data);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error); // Pass to error handler middleware
    }
  },

  // Get All Root Tasks (no parent)
  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskModel.getAllTasks();
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  async getTasksBySprintId(req, res, next) {
    try {
      const sprintId = req.params.id;
      if (!sprintId) {
        return res.status(400).json({ success: false, message: 'Sprint ID is required' });
      }
      const tasks = await taskModel.getTasksBySprintId(sprintId);
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
      const id = req.params.id;
      const task = await taskModel.getTaskById(id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },

  // Update Task
  async updateTask(req, res, next) {
    try {
      const id = req.params.id;
      const updated = await taskModel.updateTask(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Task not found or not updated' });
      }
      res.status(200).json({ success: true, message: 'Task updated successfully' });
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
  },

  // Get Sub Tasks by Task ID
  async getSubTasks(req, res, next) {
    try {
      const parentId = req.params.id;
      const subTasks = await taskModel.getSubTasks(parentId);
      res.status(200).json({ success: true, data: subTasks });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = taskController;
