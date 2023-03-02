import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ id, title, image, genres, popularity }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteMovie(id));
  };

  const isDB = () => {
    return isNaN(Number(id));
  };

  return (
    <>
      <div className="containerCard">
        {isDB() && (
          <div className="movieButtons">
            <button className="buttonCardDelete" onClick={(e)=>handleDelete(e)}>
              X
            </button>
            <Link className="linkCardEdit" to={`/edit/${id}`}>
              <button className="buttonCardEdit">EDIT</button>
            </Link>
          </div>
        )}
        <Link className="linkCard" to={`/home/${id}`}>
          <img className="imageCard" src={image} alt="imagen" />
        </Link>
        <div className="tailCard">
          <h1 className="titleMovie">{title}</h1>
          <div className="genresCard">
            {Array.isArray(genres) ? (
              genres?.map((genre, i) => {
                return (
                  <p key={i} className="genreCard">
                    {genre}
                  </p>
                );
              })
            ) : (
              <p className="genreCardDB">{genres}</p>
            )}
          </div>
        </div>
        <p className="popularityCard">{`Popularity: ${popularity}`}</p>
      </div>
    </>
  );
};

export default MovieCard;
