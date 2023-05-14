const Result = require("./result.model");

async function saveResult(req, res) {
  const resultModel = new Result(req.body);
  try {
    await resultModel.save();
    res.status(200).json(resultModel);
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
      $or: [{ player1: req.params.ids }, { player2: req.params.ids }],
    });
    if (playerResults.length < 1) res.status(404).json("User not found.");
    else res.status(200).json(playerResults);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error.");
  }
}

module.exports = { saveResult, fetchResults, fetchPlayerResults };
