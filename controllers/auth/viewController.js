const Project = require('../../models/project'); 

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

  // update user profile 
  profile: async (req, res, next) => {
    try {
      const user = req.user;
      const token = res.locals.data.token;

      // fnd proj that create by the user
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
