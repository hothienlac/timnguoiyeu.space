const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const routes = require("../router");
const path = require("path");

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../../logs/access.log"),
    { flags: "a" }
);

const expressLoader = async () => {
    const app = express();
    
    app.use(cors({
        origin: true,
        optionsSuccessStatus: 200,
    }));
    app.options('*', cors());
    app.get("/", async (req, res) => {
        return res.status(200).json({ message: "App is working" });
    });

    app.use(compression());
    app.use(helmet());
    app.use(morgan("dev", { stream: accessLogStream }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/", routes);

    return app;
};

module.exports = expressLoader;
