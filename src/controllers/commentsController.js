const Comments = require('../models/commentsModel');

const CommentsController = {
  createComment: async (req, res, next) => {
    try {
      const { task_id, sub_task_id, user_id, user_name, parent_comment_id, comment, attachments } = req.body;
      const commentId = await Comments.createComment({ task_id, sub_task_id, user_id, parent_comment_id, comment, attachments });
      res.status(201).json({ message: 'Comment added', comment_id: commentId });
    } catch (err) {
      next(err);
    }
  },

  editComment: async (req, res, next) => {
    try {
      const { comment, attachments } = req.body;
      const { id } = req.params;
      const updated = await Comments.editComment({ comment, attachments, id });
      if (!updated) return res.status(404).json({ message: 'Comment not found or already deleted' });
      res.status(200).json({ message: 'Comment updated' });
    } catch (err) {
      next(err);
    }
  },

  getAllComments: async (req, res, next) => {
    try {
      const comments = await Comments.getAllComments();
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },

  getCommentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await Comments.getCommentById(id);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  },

  getCommentsByTaskId: async (req, res, next) => {
    try {
      const { task_id } = req.params;
      const comments = await Comments.getCommentsByTaskId(task_id);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await Comments.deleteComment(id);
      if (!deleted) return res.status(404).json({ message: 'Comment not found' });
      res.status(200).json({ message: 'Comment soft deleted' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CommentsController;
