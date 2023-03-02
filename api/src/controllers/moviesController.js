const { Movie } = require("../db");

const { Op } = require("sequelize");

const axios = require("axios");

const apiKey = "4f5f43495afcc67e9553f6c684a82f84";

// const cloudinary = require("../utils/cloudinary");

const cleanArray = (arrayApi, arrayGenres) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/w500";

  // let pilaGenres = [];
  // for (k = 0; k < arrayApi.length; k++) {
  //   for (i = 0; i < arrayApi[k].genre_ids.length; i++) {
  //     for (j = 0; arrayGenres.genres.length; j++) {
  //       if (elem.genre_ids[i] === arrayGenres.genres[j].id) {
  //         pilaGenres.push(arrayGenres.genres[j].name);
  //         console.log(pilaGenres);
  //       }
  //     }
  //   }
  // }

  // console.log(pilaGenres);
  const cleanArrayRaw = arrayApi.map((elem) => {
    let pilaGenres = [];
    for (i = 0; i < elem.genre_ids.length; i++) {
      for (j = 0; j < arrayGenres.genres.length; j++) {
        if (elem.genre_ids[i] === arrayGenres.genres[j].id) {
          pilaGenres.push(arrayGenres.genres[j].name);
        }
      }
    }
    return {
      id: elem.id,
      title: elem.title,
      image: `${URL_IMAGE}${elem.poster_path}`,
      overview: elem.overview,
      release_date: elem.release_date,
      genres: pilaGenres,
      popularity: elem.popularity,
      created: false,
    };
  });
  return cleanArrayRaw;
};

const cleanDetail = (detail) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const pilaGenres = [];
  for (i = 0; i < detail.genres.length; i++) {
    pilaGenres.push(detail.genres[i].name);
  }
  const cleanDetail = {
    id: detail.id,
    title: detail.title,
    image: `${URL_IMAGE}${detail.poster_path}`,
    overview: detail.overview,
    release_date: detail.release_date,
    genres: pilaGenres,
    popularity: detail.popularity,
    created: false,
  };

  return cleanDetail;
};

// const apiMoviesOrigin = async()=>{
//   return await axios.get(
//   `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
// )}

const searchMovieByTitle = async (title) => {
  const apiMovieForFilter = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
  );
  const filteredApiRaw = apiMovieForFilter.data.results.filter((movie) => {
    return movie.title.toLowerCase().includes(title.toLowerCase());
  });
  const genres = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=4f5f43495afcc67e9553f6c684a82f84&language=en-US"
  );
  const filteredApi = cleanArray(filteredApiRaw, genres.data);
  const databaseMovies = await Movie.findAll({
    where: { title: { [Op.iLike]: `%${title.toLowerCase()}%` } },
  });

  const results = [...filteredApi, ...databaseMovies];
  return results;
};

const getAllMovies = async () => {
  const databaseMovies = await Movie.findAll();
  const apiMoviesRaw = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
  );
  const genres = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=4f5f43495afcc67e9553f6c684a82f84&language=en-US"
  );
  const apiMovies = cleanArray(apiMoviesRaw.data.results, genres.data);

  const results = [...apiMovies, ...databaseMovies];
  return results;
};

const getMovieById = async (id, source) => {
  if (source === "api") {
    var movieRaw = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    var movie = cleanDetail(movieRaw.data);
  } else {
    var movie = await Movie.findByPk(id);
  }
  return movie;

  // const movie =
  //   source === "api"
  //     ? await axios
  //         .get(
  //           `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  //         )
  //     : await Movie.findByPK(id);
  // return movie;
};

const createMovie = async (
  title,
  image,
  overview,
  release_date,
  genres,
  popularity
) => {
  // const result = await cloudinary.uploader.upload(image, {
  //   folders: movies
  //   // width:300,
  //   // crop:scale
  // });
  const newMovie = await Movie.create({
    title,
    image,
    overview,
    release_date,
    genres,
    popularity,
  });
  return newMovie;
};

const setMovie = async (
  id,
  title,
  image,
  overview,
  release_date,
  genres,
  popularity
) => {
  Movie.update(
    {
      title,
      image,
      overview,
      release_date,
      genres,
      popularity,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return id;
};

const deleteMovie = async (id) => {
  Movie.destroy({ where: { id: id } });
  return id;
};

module.exports = {
  searchMovieByTitle,
  getAllMovies,
  getMovieById,
  createMovie,
  setMovie,
  deleteMovie,
};
