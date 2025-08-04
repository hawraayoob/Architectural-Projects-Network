const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// better to save in .env file
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// check token  
exports.auth = async (req, res, next) => {
  try {
    let token = req.query.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('No token provided');

    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data._id);
    if (!user) throw new Error('User not found');

    req.user = user;
    res.locals.data = res.locals.data || {};
    res.locals.data.token = token;
    next();
  } catch (error) {
    res.status(401).send('Not authorized');
  }
};

//   create new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // generate token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.locals.data = res.locals.data || {};
    res.locals.data.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid login credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid login credentials');

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.locals.data = res.locals.data || {};
    res.locals.data.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  updateuser information
exports.updateUser = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    for (const key of updates) {
      if (key === 'password') {
        user.password = await bcrypt.hash(req.body.password, 10);
      } else {
        user[key] = req.body[key];
      }
    }

    await user.save();

    // dont serialize the user object to avoid sending sensitive data
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.locals.data = { user: userData };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deleteuser
exports.deleteUser = async (req, res, next) => {
  try {
    await req.user.deleteOne();
    res.locals.data = { message: 'User deleted' };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
