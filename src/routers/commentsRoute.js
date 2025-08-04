const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentsController');

router.post('/add-comment', CommentsController.createComment);
router.put('/edit-comment/:id', CommentsController.editComment);
router.get('/get-all-comments', CommentsController.getAllComments);
router.get('/get-comment-by-id/:id', CommentsController.getCommentById);
router.get('/get-comment-task-by/:task_id', CommentsController.getCommentsByTaskId);
router.get('/get-comment-sub-task-by/:sub_task_id', CommentsController.getCommentsBySubTaskId);
router.patch('/delete-comment/:id', CommentsController.deleteComment);

module.exports = router;
