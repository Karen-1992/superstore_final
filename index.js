const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/api", routes);

const PORT = process.env.PORT ?? 8080;

if (process.env.NODE_ENV === "production") {
    console.log("prod")
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        })
        await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green("MongoDB connected"));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}`));
        });
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
}

start();
