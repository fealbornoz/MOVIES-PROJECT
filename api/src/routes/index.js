const express = require("express");

const moviesRouter = require("./moviesRouter");

const mainRouter = express.Router();

mainRouter.use("/movies", moviesRouter);

module.exports = mainRouter;
