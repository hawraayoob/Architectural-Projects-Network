const Comment = require('../../models/comment');

// Add the missing index function that routes are looking for
exports.index = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('project').populate('user');
    res.locals.data = res.locals.data || {};
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('project').populate('user');
    res.locals.data = res.locals.data || {};
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('project').populate('user');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createComment = async (req, res, next) => {
  try {
    if (!req.body.text || !req.body.project) {
      return res.status(400).json({ message: 'Text and project ID are required' });
    }
    const comment = new Comment(req.body);
    await comment.save();
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    updates.forEach(update => comment[update] = req.body[update]);
    await comment.save();
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.deleteOne();
    res.locals.data = { message: 'Comment deleted successfully' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};