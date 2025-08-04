const express = require('express');
const router = express.Router();
const taskController = require('../controllers/subTaskController');

router.post('/create-sub-task', taskController.createTask);
router.get('/get-subtask-id/:id', taskController.getAllSubTasks);
router.get('/get-subtask-id/:parent_id/:id', taskController.getTaskById);
router.get('/sprint-task/:id', taskController.getTasksBySprintId);
router.put('/update-sub-task/:id', taskController.updateTask);
router.patch('/delete-sub-task/:id', taskController.deleteTask);

module.exports = router;