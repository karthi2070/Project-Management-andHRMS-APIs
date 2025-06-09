const express = require('express');
const router = express.Router();
const taskController = require('../controllers/subTaskController');

router.post('/sub-tasks/create-task', taskController.createTask);
router.get('/sub-tasks/get-all-tasks', taskController.getAllTasks);
router.get('/sub-tasks/get-by-id/:id', taskController.getTaskById);
router.get('/sub-tasks/:id/getby-task-under-sub-tasks', taskController.getSubTasks);
router.get('/sub-tasks/sprint-tasks/:id', taskController.getTasksBySprintId);
router.put('/sub-tasks/update-task/:id', taskController.updateTask);
router.patch('/sub-tasks/delete-task/:id', taskController.deleteTask);

module.exports = router;