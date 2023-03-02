import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Pagination from "../Pagination/Pagination";
import MoviesCards from "../MoviesCards/MoviesCards";
import { useSelector, useDispatch } from "react-redux";
import { getAllMovies } from "../../redux/actions";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => {
    return state;
  });

  const [cardsForPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllMovies(setLoading));
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  const indexOfLastCard = currentPage * cardsForPage;

  const indexOfFirstCard = indexOfLastCard - cardsForPage;

  const currentMovies = currentPage === 1 ? movies.slice(indexOfFirstCard, 9) : movies.slice(indexOfFirstCard, indexOfLastCard);

  const setPaginate = (newPageNum) => {
    if (newPageNum !== -1 && newPageNum !== currentPage) {
      setCurrentPage(newPageNum);
    }
  };

  return (
    <>
      <div>
        <div>
          <Header setPaginate={setPaginate} />
        </div>

        <div className="containerPaginationHome">
          <Pagination
            cardsForPage={cardsForPage}
            totalCards={movies.length}
            setPaginate={setPaginate}
            currentPage={currentPage}
          />
        </div>
        <div className="containerMoviesCards">
          <MoviesCards currentMovies={currentMovies} />
        </div>
      </div>
    </>
  );
};

export default Home;
