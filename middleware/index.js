// middleware code

// middlewareObj to hold all the middleware functions
// only one for now but anticipating more later
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  // check if a user is in the session
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

module.exports = middlewareObj;
