const RESOURCE_PATH = '/comments';
const PROJECT_PATH = '/projects';

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
    const projectId = req.params.projectId;
    const data = {
      ...res.locals.data,
      projectId: projectId,
      token: res.locals.data.token
    };
    res.render('comments/New', data);
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
  },

  // NEW: Redirect back to the project that the comment belongs to
  redirectToProject(req, res, next) {
    let projectId;
    
    // Try to get project ID from various sources
    if (res.locals.data && res.locals.data.comment && res.locals.data.comment.project) {
      projectId = res.locals.data.comment.project._id || res.locals.data.comment.project;
    } else if (req.body.project) {
      projectId = req.body.project;
    } else if (req.params.projectId) {
      projectId = req.params.projectId;
    }
    
    if (projectId) {
      if (res.locals.data && res.locals.data.token) {
        res.redirect(`${PROJECT_PATH}/${projectId}?token=${res.locals.data.token}`);
      } else {
        res.redirect(`${PROJECT_PATH}/${projectId}`);
      }
    } else {
      // Fallback to projects index if we can't determine project ID
      if (res.locals.data && res.locals.data.token) {
        res.redirect(`${PROJECT_PATH}?token=${res.locals.data.token}`);
      } else {
        res.redirect(PROJECT_PATH);
      }
    }
  }
};

module.exports = viewController;