const Comment = require('../../models/comment');

// Add the missing index function that routes are looking for
exports.index = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('project').populate('author');
    res.locals.data = res.locals.data || {};
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('project').populate('author');
    res.locals.data = res.locals.data || {};
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// NEW: Get comments for a specific project
exports.getCommentsByProjectId = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.project;
    const comments = await Comment.find({ project: projectId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    res.locals.data = res.locals.data || {};
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('project').populate('author');
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
    // Fix field name inconsistency - use 'content' to match model
    if (!req.body.content && req.body.text) {
      req.body.content = req.body.text;
    }
    
    if (!req.body.content || !req.body.project) {
      return res.status(400).json({ message: 'Content and project ID are required' });
    }
    
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      project: req.body.project
    });
    
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
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    // Check if user owns the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this comment' });
    }
    
    // Fix field name inconsistency
    if (req.body.text) {
      req.body.content = req.body.text;
    }
    
    const updates = Object.keys(req.body);
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
    
    // Check if user owns the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    await comment.deleteOne();
    res.locals.data = { message: 'Comment deleted successfully' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};