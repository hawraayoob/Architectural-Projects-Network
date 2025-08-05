const Comment = require('../../models/comment')
const Project = require('../../models/project')

// Add comment to a project (wether architect or client)
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body
    const projectId = req.params.projectId

    const project = await Project.findById(projectId)
    if (!project) return res.status(404).json({ message: 'Project not found' })

    const comment = new Comment({
      text,
      author: req.user._id,
      project: projectId
    })

    await comment.save()
    res.status(201).json(comment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get comments for a certain project
exports.getCommentsForProject = async (req, res) => {
  try {
    const comments = await Comment.find({ project: req.params.projectId })
      .populate('author', 'name')
      .sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

