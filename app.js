const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");
const flash = require("connect-flash");
require("dotenv").config();

// require routes
const indexRoutes = require("./routes/index");
const profileRoutes = require("./routes/profiles");

// deprecation warning fixes
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// connect to the db
mongoose.connect("mongodb://localhost/running_app");

// app configuration
app.set("view engine", "ejs");
// get info from html forms, extended so nested objects can be posted
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
// flash messages
app.use(flash());

// --- configure passport ---
// give http some state
app.use(
  require("express-session")({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.use(new localStrategy(User.authenticate())); // define local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- end of passport configuration ---

// middleware to be used on every route
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// routes
app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
