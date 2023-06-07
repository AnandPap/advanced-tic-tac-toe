const express = require("express");
const {
  saveResult,
  fetchResults,
  fetchPlayerResults,
} = require("./controllers");

const router = express.Router();

router.route("/api/results").post(saveResult).get(fetchResults);
router.route("/api/player-results/:ids").get(fetchPlayerResults);

module.exports = router;
