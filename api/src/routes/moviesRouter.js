const express = require("express");

const moviesRouter = express.Router();

const {
  getAllMoviesHandler,
  getMovieHandler,
  createMovieHandler,
  setMovieHandler,
  deleteMovieHandler,
} = require("../handlers/moviesHandler");

moviesRouter.get("/", getAllMoviesHandler);
moviesRouter.get("/:id", getMovieHandler);
moviesRouter.post("/", createMovieHandler);
moviesRouter.put("/:id", setMovieHandler);
moviesRouter.delete("/:id", deleteMovieHandler);

module.exports = moviesRouter;
