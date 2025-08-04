const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControlller');

router.post('/create-task', taskController.createTask);
router.get('/sprint-task/:sprint_id', taskController.getAllTasksBySprintId);
router.get('/get-all-task-by-project/:project_id',taskController.getAllTasksByProjectId)
router.get('/get-by-task/:sprint_id/:task_id', taskController.getTaskById);
router.get('/get-sub-task/:id', taskController.getSubTasks);
router.put('/update-task/:id', taskController.updateTask);
router.patch('/delete-task/:id', taskController.deleteTask);

module.exports = router;
