const mongoose = require("mongoose");

// profile schema
// will hold all the info about the users profile in the database
const profileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  profilePic: String,
  personalBests: [{ distance: String, time: String }],
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Profile", profileSchema);
