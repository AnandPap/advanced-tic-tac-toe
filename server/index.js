const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./src/config.js");
const router = require("./src/routes.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log("Server started.");
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "../client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});
