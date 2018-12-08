const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Initial test");
});

app.listen("1000", () => {
  console.log("Server running on port 1000");
});
