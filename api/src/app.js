const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(mainRouter);


module.exports = app;
