const Project = require('../../models/project');
const Comment = require('../../models/comment');

// INDEX - Return all projects
exports.index = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.locals.data = { projects };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all projects (API layer)
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.locals.data.projects = projects;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  CREATE project with image upload
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // const image = req.file ? req.file.filename : null;

    const project = new Project({
      title,
      description,
      image,
      architect: req.user._id
    });

    await project.save();
    res.locals.data.projects = { project };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET one project by ID with comments
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('architect', 'name');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Get comments for this project
    const comments = await Comment.find({ project: req.params.id })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    res.locals.data = res.locals.data || {};
    res.locals.data.project = project;
    res.locals.data.comments = comments;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// UPDATE project by ID
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields
    const updates = Object.keys(req.body);
    updates.forEach(update => {
      project[update] = req.body[update];
    });

    // to edite image exchange image
    if (req.file) {
      project.image = req.file.filename;
    }

    await project.save();
    res.locals.data.projects = { project };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// DELETE project by ID
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete all comments associated with this project
    await Comment.deleteMany({ project: req.params.id });
    
    await project.deleteOne();
    res.locals.data.projects = { message: 'Project deleted successfully' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};