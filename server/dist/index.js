import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dirname, join } from "path";
import config from "./src/config.js";
import router from "./src/routes.js";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.listen(config.port, () => {
    console.log(`Server started on port: ${config.port}`);
});
mongoose
    .connect(config.mongo)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.log(err));
app.use(express.static(join(__dirname, "../../client", "dist")));
app.get("/*", (req, res) => {
    res.sendFile(join(__dirname, "../../client/dist/index.html"));
});
app.use((err, req, res, next) => {
    console.log(err);
    if (err.status === 504)
        res.status(504).json({ error: "Gateway Timeout" });
    else
        res
            .status(err.status || 500)
            .json({ error: err.message || "Internal Server Error" });
});
