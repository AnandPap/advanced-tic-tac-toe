const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./src/config.js");
const router = require("./src/routes.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://advanced-tic-tac-toe-anandpap.vercel.app" }));

app.use(router);

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log("Server started.");
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));
