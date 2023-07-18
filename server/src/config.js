require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  mongo: process.env.MONGO || "mongodb://127.0.0.1:27017",
};

module.exports = config;
