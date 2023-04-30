require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  mongo: process.env.MONGO || "mongodb://localhost:27017",
};

module.exports = config;
