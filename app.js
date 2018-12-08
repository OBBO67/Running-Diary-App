const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// require routes
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use("/", indexRoutes);

app.listen("1000", () => {
  console.log("Server running on port 1000");
});
