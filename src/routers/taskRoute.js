const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControlller');

router.post('/tasks/create-task', taskController.createTask);
router.get('/tasks/sprint-tasks/:sprint_id', taskController.getAllTasksBySprintId);
router.get('/tasks/get-all-task-by-project/:project_id',taskController.getAllTasksByProjectId)
router.get('/tasks/get-by-task/:sprint_id/:task_id', taskController.getTaskById);
router.get('/tasks/get-sub-tasks/:id', taskController.getSubTasks);
router.put('/task/update-task/:id', taskController.updateTask);
router.patch('/task/delete-task/:id', taskController.deleteTask);

module.exports = router;
