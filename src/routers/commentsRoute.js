const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentsController');

router.post('/comments/add-comment', CommentsController.createComment);
router.put('/comments/edit-comment/:id', CommentsController.editComment);
router.get('/comments/get-all-comments', CommentsController.getAllComments);
router.get('/comments/get-comment-by-id/:id', CommentsController.getCommentById);
router.get('/comments/get-comment-task-by/:task_id', CommentsController.getCommentsByTaskId);
router.patch('/comments/delete-comment/:id', CommentsController.deleteComment);

module.exports = router;
