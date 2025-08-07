const Project = require('../../models/project');


exports.index = (req, res) => {
  try {
    // Use data from middlewre
    const { projects } = res.locals.data;
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//   createnewProject
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const project = new Project({ title, description, ...req.body });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  getAllProjects 
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//   getprojectById
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// updateproject
exports.updateProject = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    updates.forEach(update => (project[update] = req.body[update]));
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  deleteProject
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};