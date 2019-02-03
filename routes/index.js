const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Landing Page
router.get("/", (req, res) => {
  res.render("landing");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle register logic
// creates a new user and then logs them in if successful
router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(`Error registering user: ${err}`);
        req.flash("error", err.message);
        return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", `Welcome to The Running Diary ${user.username}`);
        res.redirect("/profiles"); // ok for now will change to setup profile page
      });
    }
  );
});

// handle login logic, use autheticate as the middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profiles",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logout successful");
  res.redirect("/login");
});

module.exports = router;
