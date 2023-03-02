import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import NotSearch from "../NotSearch/NotSearch";
import "./MoviesCards.css";


const MoviesCards = ({currentMovies}) => {



  if (!currentMovies || !currentMovies.length) {
    return (
      <div className="containerNotFoundCards">
        <NotSearch />
      </div>
    );
  }

  return (
    <>
      <div className="containerCards">
        {currentMovies?.map((movie) => {
          return (
            <MovieCard
              id={movie.id}
              title={movie.title}
              image={movie.image}
              genres={movie.genres}
              popularity={movie.popularity}
              key={movie.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default MoviesCards;
