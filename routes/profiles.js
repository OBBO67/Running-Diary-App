const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

// --- ROUTES ---
// name         url                  verb            desc.
// ============================================================================================
// INDEX      /profiles              GET         Display list of all profiles
// NEW        /profiles/new          GET         Display new profile form
// CREATE     /profiles              POST        Add new profile to DB associated with the user
// SHOW       /profiles/:id          GET         Shows info about one profile

// Index route
router.get("/", (req, res) => {
  // for now just render the profiles page
  // will need to add code to get all profiles from the DB when implemented
  // probably need to add middleware as user should be logged in to do this
  res.render("profiles/index", {
    currentUser: req.user
  });
});

// Show route
// router.get("/:id", (req, res) => {
//   // for now will just show the users profile page
//   // will need to add code to get the requested profile from the DB when implemented
//   // probably need to add middleware as user should be logged in to do this
//   res.render("profiles/show");
// });

// New route
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("profiles/new");
});

module.exports = router;
