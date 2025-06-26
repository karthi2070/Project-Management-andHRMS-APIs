const Comments = require('../models/commentsModel');
const activityLogger=require('../helper/actvitylog')

const CommentsController = {
  createComment: async (req, res, next) => {
    try {
      const {
        task_id,
        sub_task_id,
        user_id,
        parent_comment_id,
        comment,
        attachments
      } = req.body;
console.log(req.body)
      const commentId = await Comments.createComment({task_id,sub_task_id, user_id,parent_comment_id, comment,attachments});

      await activityLogger.addCommentLog({
        task_id,
        sub_task_id,
        user_id,
        comment,
        action_type: parent_comment_id ? 'comment_replied' : 'comment_added'
      });

      res.status(201).json({ message: 'Comment added', comment_id: commentId });
    } catch (err) {
      next(err);
    }
  },

  editComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comment, attachments, user_id } = req.body;

      const existing = await Comments.getCommentById(id);
      if (!existing) return res.status(404).json({ message: 'Comment not found' });

      await Comments.editComment({ id, comment, attachments });

      await activityLogger.addCommentEditLog({
        task_id: existing.task_id,
        sub_task_id: existing.sub_task_id,
        user_id,
        old_comment: existing.comment,
        new_comment: comment
      });

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
  getCommentsBySubTaskId: async (req, res, next) => {
    try {
      const { sub_task_id } = req.params;
      const comments = await Comments.getCommentsBySubTaskId(sub_task_id);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Comment ID is required' });
      const comment = await Comments.getCommentById(id)
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      const deleted = await Comments.deleteComment(id);

      await activityLogger.deleteCommentLog({
        task_id: comment.task_id,
        sub_task_id: comment.sub_task_id,
        user_id: comment.user_id,
        old_value: comment.comment,
        new_value: 'comment_deleted' 

      });
//id, task_id, sub_task_id, user_name, action_type, old_value, new_value, updated_by, created_at, updated_at, user_id
      res.status(201).json({ message: 'Comment deleted', comment_id: id });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CommentsController;
