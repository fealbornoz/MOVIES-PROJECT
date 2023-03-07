
const {
  searchMovieByTitle,
  getAllMovies,
  getMovieById,
  createMovie,
  setMovie,
  deleteMovie
} = require("../controllers/moviesController");


const getAllMoviesHandler = async (req, res) => {
  try {
    const { title } = req.query;
    const results = title
      ? await searchMovieByTitle(title)
      : await getAllMovies();
    res.status(200).send(results);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

const getMovieHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const movie = await getMovieById(id, source);
    res.status(200).send(movie);
  } catch (error) {
    return res.status(404).send({ error: "Movie not found" });
  }
};

const createMovieHandler = async (req, res) => {
  try {
    const { title, image, overview, release_date, genres, popularity } =
      req.body;
    const newMovie = await createMovie(
      title,
      image,
      overview,
      release_date,
      genres,
      popularity
    );
    res.status(200).send(newMovie);
  } catch (error) {
    return res.status(404).send({ error: "Missing required fields!" });
  }
};

const setMovieHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, overview, release_date, genres, popularity } =
      req.body;
    const updateMovie = await setMovie(
      id,
      title,
      image,
      overview,
      release_date,
      genres,
      popularity
    );
    res.status(200).send(updateMovie);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

const deleteMovieHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    var movieDelete = id
    if (source === "bdd") {
      var movieDelete = await deleteMovie(id);
      return res.status(200).send(movieDelete);
    }
    else{
      return res.status(200).send(movieDelete);
    }
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

module.exports = {
  getAllMoviesHandler,
  getMovieHandler,
  createMovieHandler,
  setMovieHandler,
  deleteMovieHandler,
};
