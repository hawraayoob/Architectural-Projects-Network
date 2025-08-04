const RESOURCE_PATH = '/comments';

const viewController = {
  index(req, res, next) {
    // Render the index view with comments data
    res.render('comments/Index', res.locals.data || {});
  },

  show(req, res, next) {
    // Render the show view for a single comment
    res.render('comments/Show', res.locals.data || {});
  },

  edit(req, res, next) {
    // Render the edit form view for a comment
    res.render('comments/Edit', res.locals.data || {});
  },

  newView(req, res, next) {
    // Render the form to create a new comment
    res.render('comments/New', res.locals.data || {});
  },

  redirectHome(req, res, next) {
    // Redirect to comments index, include token if present
    if (res.locals.data && res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
    } else {
      res.redirect(RESOURCE_PATH);
    }
  },

  redirectShow(req, res, next) {
    // Redirect to show a single comment by id, include token if present
    if (res.locals.data && res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
    }
  }
};

module.exports = viewController;
