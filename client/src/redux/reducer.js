import {
  GET_ALL_MOVIES,
  DELETE_MOVIE,
  GET_MOVIE_DETAIL,
  CLEAN_DETAIL,
  FILTER,
  ORDER,
} from "./actions";

const initialState = {
  allMovies: [],
  movies: [],
  movieDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
        movies: action.payload,
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => {
          return movie.id !== action.payload;
        }),
        allMovies: state.allMovies.filter((movie) => {
          return movie.id !== action.payload;
        }),
      };

    case GET_MOVIE_DETAIL: {
      return {
        ...state,
        movieDetail: action.payload,
      };
    }

    case CLEAN_DETAIL: {
      return {
        ...state,
        movieDetail: {},
      };
    }

    case FILTER:
      return {
        ...state,
        movies:
          action.payload === "All"
            ? state.allMovies
            : state.allMovies.filter((movie) => {
                return Array.isArray(movie.genres)
                  ? movie.genres.includes(action.payload)
                  : movie.genres === action.payload;
              }),
      };

    case ORDER:
      return {
        ...state,
        movies:
          action.payload === "Ascending"
            ? state.allMovies.sort((a, b) => a.popularity - b.popularity)
            : state.allMovies.sort((a, b) => b.popularity - a.popularity),
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
