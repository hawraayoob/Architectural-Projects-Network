exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.locals.data = { token };
    req.user = user;
    next();  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


