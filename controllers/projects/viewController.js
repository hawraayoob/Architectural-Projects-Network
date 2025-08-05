const Project = require("../../models/project");

const RESOURCE_PATH = '/projects';

const viewController = {
  index(req, res, next) {
    res.render('projects/Index', res.locals.data || {});
  },
  show(req, res, next) {
    res.render('projects/Show', { project: res.locals.data.projects });
  },
  edit(req, res, next) {
    res.render('projects/Edit', res.locals.data || {});
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
  }
};

module.exports = viewController;
