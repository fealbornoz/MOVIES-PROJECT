import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetail, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getMovieDetail(id, setLoading));

    return () => {
      return dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const { movieDetail } = useSelector((state) => {
    return state;
  });

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <>
      <div className="containerGlobalDetail">
        <div className="detailCard">
          <div className="containerImageDetail">
            <img className="imageDetail" src={movieDetail.image} alt="imagen" />
          </div>
          <div className="overviewDetail">
            <div className="containerHeadDetail">
              <h1 className="titleDetail">{movieDetail.title}</h1>
              <p>{movieDetail.overview}</p>
            </div>
            <div className="containerDataDetail">
              <p className="dataDetail">{`Release Date : ${movieDetail.release_date}`}</p>
              <div>
              {Array.isArray(movieDetail.genres)
                ? movieDetail.genres?.map((genre, i) => {
                    return (
                      <p key={i} className="genreCard">
                        {genre}
                      </p>
                    );
                  })
                : <p className="genreCardDB">{movieDetail.genres}</p>}
                </div>
              <p className="dataDetail">{`Popularity: ${movieDetail.popularity}`}</p>
            </div>
            <Link className="linkDetail" to="/home">
            <button className="buttonDetail">
                Back
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
