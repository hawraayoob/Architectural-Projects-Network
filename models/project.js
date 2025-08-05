const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {type: String}, 
  architect: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{type: String}],
  published: { type: Boolean, default: false }
}, {
  timestamps: true 
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
