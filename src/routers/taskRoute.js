const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControlller');

router.post('/tasks/create-task', taskController.createTask);
router.get('/tasks/get-all-tasks', taskController.getAllTasks);
router.get('/tasks/get-by-id/:id', taskController.getTaskById);
router.get('/tasks/:id/sub-tasks', taskController.getSubTasks);
router.put('/task/update-task/:id', taskController.updateTask);
router.patch('/task/delete-task/:id', taskController.deleteTask);

module.exports = router;
