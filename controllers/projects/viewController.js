const Project = require("../../models/project");

const RESOURCE_PATH = '/projects';

const viewController = {
  index(req, res, next) {
    res.render('projects/Index', {...res.locals.data, user: req.user });
  },
  show(req, res, next) {
    res.render('projects/Show', res.locals.data );
  },

  edit(req, res, next) { 
  res.render('projects/Edit', {
    ...res.locals.data,
    token: res.locals.data.token || req.query.token || ''  //to add new img
  });
},

  newView(req, res, next) {
    res.render('projects/New', res.locals.data || {});
  },
  redirectHome(req, res, next) {
    if (res.locals.data && res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
    } else {
      res.redirect(RESOURCE_PATH);
    }
  },
  redirectShow(req, res, next) {
    if (res.locals.data && res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
    }
  },
    async showProfile(req, res, next) {
    try {
      const user = req.user;
      const token = res.locals.data.token;
      const projects = await Project.find({}); // filter by user ID

      res.render('auth/Profile', {
        user,
        token,
        projects
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};


module.exports = viewController;


