const express = require("express");
const { saveResult, fetchResults } = require("./controllers.js");

const router = express.Router();

router.route("/api/results").post(saveResult).get(fetchResults);

module.exports = router;
