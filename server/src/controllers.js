const Result = require("./models");

async function saveResult(req, res) {
  const result = new Result(req.body);
  try {
    await result.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function fetchResults(req, res) {
  try {
    const results = await Result.find({});
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function fetchPlayerResults(req, res) {
  try {
    const playerResults = await Result.find({
      $or: [{ player1: req.params.id }, { player2: req.params.id }],
    });
    if (playerResults.length < 1) res.status(404).json("User not found.");
    else res.status(200).json(playerResults);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error.");
  }
}

module.exports = { saveResult, fetchResults, fetchPlayerResults };
