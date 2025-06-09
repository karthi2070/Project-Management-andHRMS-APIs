const express = require('express');
const router = express.Router();
const taskController = require('../controllers/subTaskController');

router.post('/sub-tasks/create-task', taskController.createTask);
router.get('/sub-tasks/get-subtasks-id/:id', taskController.getAllSubTasks);
router.get('/sub-tasks/get-subtasks-id/:parent_id/:id', taskController.getTaskById);
router.get('/sub-tasks/sprint-tasks/:id', taskController.getTasksBySprintId);
router.put('/sub-tasks/update-task/:id', taskController.updateTask);
router.patch('/sub-tasks/delete-task/:id', taskController.deleteTask);

module.exports = router;