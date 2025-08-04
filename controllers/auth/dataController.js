const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    let token;
    if (req.query.token) {
      token = req.query.token;
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }

    const data = jwt.verify(token, 'secret');
    const user = await User.findOne({ _id: data._id });
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    res.locals.data = res.locals.data || {};
    res.locals.data.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.locals.data = res.locals.data || {};
    res.locals.data.user = user;
    res.locals.data.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  console.log('Login attempt with body:', req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log('Found user:', user);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: 'Invalid login credentials' });
    }
    const token = await user.generateAuthToken();
    // res.locals.data = res.locals.data || {};
    res.locals.data.user = user;
    res.locals.data.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    for (const update of updates) {
      if (update === 'password') {
        user.password = await bcrypt.hash(req.body.password, 10);
      } else {
        user[update] = req.body[update];
      }
    }
    await user.save();
    res.locals.data = res.locals.data || {};
    res.locals.data.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    await req.user.deleteOne();
    res.locals.data = { message: 'User deleted successfully' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


