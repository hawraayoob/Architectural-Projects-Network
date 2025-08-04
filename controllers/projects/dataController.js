const Project = require('../../models/project');

// Add the missing index function that your routes are looking for
exports.index = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.locals.data = { projects };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.locals.data = { projects };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const project = new Project(req.body);
    await project.save();
    res.locals.data = { project };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.locals.data = { project };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    updates.forEach(update => project[update] = req.body[update]);
    await project.save();
    res.locals.data = { project };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.locals.data = { message: 'Project deleted successfully' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};