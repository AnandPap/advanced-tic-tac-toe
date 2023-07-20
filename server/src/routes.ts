import express from "express";
import {
  fetchScores,
  saveResult,
  fetchResults,
  fetchPlayerResults,
} from "./controllers.js";

const router = express.Router();

router.route("/api/scores").get(fetchScores);
router.route("/api/results").post(saveResult).get(fetchResults);
router.route("/api/player-results/:name").get(fetchPlayerResults);

export default router;
