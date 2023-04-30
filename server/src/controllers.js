const Result = require("./result.model");

async function saveResult(req, res) {
  const resultModel = new Result(req.body);
  try {
    await resultModel.save();
    res.status(200).json(resultModel);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function fetchResults(req, res) {
  try {
    const results = await Result.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

module.exports = { saveResult, fetchResults };
