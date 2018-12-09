const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const middleware = require("../middleware");

// ---- Image upload code ----
const multer = require("multer");
// create unique name, using the date now method, for when the profile pic is uploaded
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

// ensure only image files are uploaded
const imageFilter = function(req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return callback(new Error("Only image files can be uploaded"), false);
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const cloudinary = require("cloudinary");

// configure cloudinary using account details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USERNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

// New route
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("profiles/new");
});

// Show route
router.get("/:id", (req, res) => {
  // find the profile with the given id
  Profile.findOne({ _id: req.params.id }, (err, foundProfile) => {
    if (err) {
      console.log(`Error finding profile: ${err}`);
      req.flash("error", "Could not find profile");
      res.redirect("back");
    } else {
      console.log(`Profile found: ${foundProfile}`);
      res.send("showpage");
    }
  });
});

// Create route
router.post(
  "/",
  middleware.isLoggedIn,
  upload.single("profileImg"),
  (req, res) => {
    // req.file.path is the name of the file uploaded
    cloudinary.uploader.upload(req.file.path, result => {
      // add cloudinary url for the image to the profile object under the profilePic prop
      req.body.profile.profilePic = result.secure_url;
      // add user to the profile
      req.body.profile.owner = {
        id: req.user._id,
        username: req.user.username
      };
      // Create the profile in the database using the profile obj from the form
      Profile.create(req.body.profile, (err, profile) => {
        // if there is an error redirect back
        // otherwise redirect to the users profile
        if (err) {
          console.log(`Error creating a profile: ${err}`);
          req.flash("error", err.message);
          return res.redirect("back");
        }
        res.redirect(`/profiles/${profile.id}`);
      });
    });
  }
);

module.exports = router;
