const RESOURCE_PATH = '/users';

const viewController = {
  index(req, res, next) {
    res.render('users/Index', res.locals.data || {});
  },
  show(req, res, next) {
    res.render('users/Show', res.locals.data || {});
  },
  edit(req, res, next) {
    res.render('users/Edit', res.locals.data || {});
  },
  newView(req, res, next) {
    res.render('users/New', res.locals.data || {});
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
