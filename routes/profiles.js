const express = require("express");
const router = express.Router();

// --- ROUTES ---
// name         url                  verb            desc.
// ============================================================================================
// INDEX      /profiles              GET         Display list of all profiles
// SHOW       /profiles/:id          GET         Shows info about one profile

// Index route
router.get("/profiles", (req, res) => {
  // for now just render the profiles page
  // will need to add code to get all profiles from the DB when implemented
  // probably need to add middleware as user should be logged in to do this
  res.render("profiles/index");
});

// Show route
router.get("/profiles/:id", (req, res) => {
  // for now will just show the users profile page
  // will need to add code to get the requested profile from the DB when implemented
  // probably need to add middleware as user should be logged in to do this
  res.render("profiles/show");
});

module.exports = router;
