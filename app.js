const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));

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
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- end of passport configuration ---

// routes
app.use("/", indexRoutes);
app.use("/", profileRoutes);

app.listen("1000", () => {
  console.log("Server running on port 1000");
});
