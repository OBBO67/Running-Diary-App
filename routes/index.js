const express = require("express");
const router = express.Router();
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
        return res.redirect("/register");
      }
      res.redirect("/profiles"); // ok for now will change to setup profile page
    }
  );
});

module.exports = router;
