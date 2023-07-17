const express = require("express");
const {
  fetchScores,
  saveResult,
  fetchResults,
  fetchPlayerResults,
} = require("./controllers");

const router = express.Router();

router.route("/api/scores").get(fetchScores);
router.route("/api/results").post(saveResult).get(fetchResults);
router.route("/api/player-results/:name").get(fetchPlayerResults);

module.exports = router;
