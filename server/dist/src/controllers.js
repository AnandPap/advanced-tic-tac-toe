var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Result from "./models.js";
function fetchScores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playerBattles = yield Result.find({
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
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}
function saveResult(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(req.body);
        try {
            yield result.save();
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}
function fetchResults(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield Result.find({});
            res.status(200).json(results);
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}
function fetchPlayerResults(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playerResults = yield Result.find({
                $or: [{ player1: req.params.name }, { player2: req.params.name }],
            });
            if (playerResults.length < 1)
                res.status(404).json("User not found.");
            else
                res.status(200).json(playerResults);
        }
        catch (err) {
            res.status(500).json("Internal server error.");
        }
    });
}
export { fetchScores, saveResult, fetchResults, fetchPlayerResults };
