import axios from "axios";
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

export const getAllMovies = (setLoading) => {
  setLoading(true);
  return function (dispatch) {
    axios
      .get(`/movies`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({ type: GET_ALL_MOVIES, payload: data });
      })
      .catch((error) => console.log(new Error(error)))
      .finally(() => setLoading(false));
  };
};

export const getAllMoviesFilter = (input,setPaginate) => {
  return function (dispatch) {
    axios
      .get(`/movies?title=${input}`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({ type: GET_ALL_MOVIES, payload: data });
      })
      .catch((error) => console.log(new Error(error)))
      .finally(()=> setPaginate(1))
  };
};

export const deleteMovie = (id) => {
  return function (dispatch) {
    axios
      .delete(`/movies/${id}`)
        return dispatch({ type: DELETE_MOVIE, payload: id });
      }
  };


export const getMovieDetail = (id, setLoading) => {
  setLoading(true);
  return function (dispatch) {
    axios
      .get(`/movies/${id}`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({ type: GET_MOVIE_DETAIL, payload: data });
      })
      .catch((error) => console.log(new Error(error)))
      .finally(() => setLoading(false));
  };
};

export const updateMovie = (id, form,navigate) => {
  return function () {
    axios
      .put(`/movies/${id}`, form)
      .catch((error) => console.log(new Error(error)))
      .finally(()=> navigate("/home"))
  }
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const filterMovies = (genero) => {
  return { type: FILTER, payload: genero };
};

export const orderMovies = (ascOrDesc) => {
  return { type: ORDER, payload: ascOrDesc };
};

export const createMovie = (form,navigate) => {
  return function () {
    axios
      .post("/movies", form)
      .catch((error) => console.log(new Error(error)))
      .finally(()=> navigate("/home"))
  };
};
