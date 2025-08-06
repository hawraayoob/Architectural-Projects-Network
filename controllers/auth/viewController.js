const Project = require('../../models/project'); // ⬅️ Make sure to require this

const viewController = {
  signUp(req, res, next) {
    res.render('auth/SignUp');
  },

  signIn(req, res, next) {
    res.render('auth/SignIn');
  },

  apiAuth(req, res, next) {
    res.json({ user: req.user, token: res.locals.data.token });
  },

  redirectToLogin(req, res, next) {
    res.redirect('/users/login');
  },

  // ✅ Updated profile method
  profile: async (req, res, next) => {
    try {
      const user = req.user;
      const token = res.locals.data.token;

      // 🔍 Find projects created by this user
      const projects = await Project.find({ architect: user._id });

      res.render('auth/Show', {
        user,
        token,
        projects
      });
    } catch (err) {
      console.log('Error loading profile:', err.message);
      res.status(500).send('Error loading profile page');
    }
  },

  redirectToProfile(req, res, next) {
    const token = res.locals.data.token;
    res.redirect(`/profile?token=${token}`);
  }
};

module.exports = viewController;
