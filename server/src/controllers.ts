import { Request, Response } from "express";
import Result from "./models.js";

async function fetchScores(req: Request, res: Response) {
  try {
    const playerBattles = await Result.find({
      $or: [
        {
          $and: [
            { player1: { $regex: req.query.player1, $options: "i" } },
            { player2: { $regex: req.query.player2, $options: "i" } },
          ],
        },
        {
          $and: [
            { player1: { $regex: req.query.player2, $options: "i" } },
            { player2: { $regex: req.query.player1, $options: "i" } },
          ],
        },
      ],
    });
    res.status(200).json(playerBattles);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function saveResult(req: Request, res: Response) {
  const result = new Result(req.body);
  try {
    await result.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function fetchResults(req: Request, res: Response) {
  try {
    const results = await Result.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function fetchPlayerResults(req: Request, res: Response) {
  try {
    const playerResults = await Result.find({
      $or: [{ player1: req.params.name }, { player2: req.params.name }],
    });
    if (playerResults.length < 1) res.status(404).json("User not found.");
    else res.status(200).json(playerResults);
  } catch (err) {
    res.status(500).json("Internal server error.");
  }
}

export { fetchScores, saveResult, fetchResults, fetchPlayerResults };
