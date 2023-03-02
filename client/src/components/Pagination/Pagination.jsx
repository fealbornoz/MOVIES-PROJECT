import React from "react";
import "./Pagination.css";

const Pagination = ({ cardsForPage, currentPage, setPaginate, totalCards }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsForPage); i++) {
    pageNumbers.push(i);
  }

  const changeBack = () => {
    const back = currentPage - 1;
    /* console.log(next); */
    if (back >= pageNumbers[0]) {
      //Se podria poner pageNumbers.length
      setPaginate(back);
    }
  };

  const changeNext = () => {
    const next = currentPage + 1;
    /* console.log(next); */
    if (next <= pageNumbers[pageNumbers.length - 1]) {
      //Se podria poner pageNumbers.length
      setPaginate(next);
    }
  };

  const isItemSelect = (numItem) => {
    return numItem === currentPage;
  };

  const isItemFirst = () => {
    return currentPage === pageNumbers[0];
  };

  const isItemLast = () => {
    return currentPage === pageNumbers[pageNumbers.length - 1];
  };

  return (
    <>
      <div className="containerPaginationGlobal">
        {pageNumbers.length > 1 && (
          <div className="containerPagination">
            {
              <p
                className={isItemFirst() ? "active" : "disabled"}
                onClick={changeBack}
              >
                {"<"}
              </p>
            }
            {pageNumbers?.map((num) => {
              return (
                <p
                  className={isItemSelect(num) ? "active" : "disabled"}
                  key={num}
                  onClick={(e) => setPaginate(num)}
                >
                  {num}
                </p>
              );
            })}
            {
              <p
                className={isItemLast() ? "active" : "disabled"}
                onClick={changeNext}
              >
                {">"}
              </p>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
