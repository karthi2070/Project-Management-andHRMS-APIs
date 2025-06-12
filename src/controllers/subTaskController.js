const subTaskModel = require('../models/subTaskModel');

const subTaskController = {
  // Create Task
  async createTask(req, res, next) {
    try {
      const data = req.body;

      const task = await subTaskModel.createTask(data);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error)
    }
  },
  async getAllSubTasks(req, res, next) {
    try {
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Sprint ID is required' });
      }
      const tasks = await subTaskModel.getAllSubTasks(id);
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
      const {parent_id,id} = req.params;
      const task = await subTaskModel.getTaskById(parent_id,id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }, 
   async getTasksBySprintId(req, res, next) {
    try {
      const sprintId = req.params.id;
      const subTasks = await subTaskModel.getTasksBySprintId(sprintId);
      res.status(200).json({ success: true, data: subTasks });
    } catch (error) {
      next(error);
    }
  },

  // Update Task
  async updateTask(req, res, next) {
    try {
      const {id} = req.params;
      const updated = await subTaskModel.updateTask(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Task not found or not updated' });
      }
      res.status(200).json({  message: 'Task updated successfully',updated :updated});
    } catch (error) {
      next(error);
    }
  },

  // Delete Task (Soft Delete)
  async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const deleted = await subTaskModel.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Task not found or not deleted' });
      }
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = subTaskController;
