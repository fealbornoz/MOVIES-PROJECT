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
      .get(`http://localhost:3001/movies`)
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
      .get(`http://localhost:3001/movies?title=${input}`)
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
      .delete(`http://localhost:3001/movies/${id}`)
      .then((response) => {
        return response.data;
      })
      .then((id) => {
        return dispatch({ type: DELETE_MOVIE, payload: id });
      });
  };
};

export const getMovieDetail = (id, setLoading) => {
  setLoading(true);
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/movies/${id}`)
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
      .put(`http://localhost:3001/movies/${id}`, form)
      .then((response) => {
        return alert("It was successfully edited");
      })
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
      .post("http://localhost:3001/movies", form)
      .then((res) => {
        return alert("It was successfully created");
      })
      .catch((error) => console.log(new Error(error)))
      .finally(()=> navigate("/home"))
  };
};
