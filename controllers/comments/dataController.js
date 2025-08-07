const Comment = require('../../models/comment');

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

// comment on specific proj
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
    
    console.log('Found comment for edit:', comment);
    
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment;
    next();
  } catch (error) {
    console.log('Error getting comment:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.createComment = async (req, res, next) => {
  try {

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
    console.log('Update comment - req.params.id:', req.params.id);
    console.log('Update comment - req.body:', req.body);
    
    const comment = await Comment.findById(req.params.id).populate('project');
    if (!comment) {
      console.log('Comment not found');
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    console.log('Found comment to update:', comment);
    
    // Update the content 
    if (req.body.content) {
      comment.content = req.body.content;
      console.log('Updated content to:', req.body.content);
    }
    
    await comment.save();
    console.log('Comment saved successfully');
    
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment;
    next();
  } catch (error) {
    console.log('Error updating comment:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('project');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    await comment.deleteOne();
    
    res.locals.data = res.locals.data || {};
    res.locals.data.comment = comment; //for direct
    res.locals.data.message = 'Comment deleted successfully';
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};