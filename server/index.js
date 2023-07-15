const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./src/config.js");
const router = require("./src/routes.js");
const { join } = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(config.port, () => {
  console.log(`Server started on port: ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

app.use(express.static(join(__dirname, "../client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

app.use((err, req, res) => {
  console.log(err);
  res.sendStatus(404);
});
