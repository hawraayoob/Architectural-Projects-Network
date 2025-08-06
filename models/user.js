const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['architect', 'client'], default: 'client' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, {
  timestamps: true
})


//  password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

//   create token auth
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'secret')
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
