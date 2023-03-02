import React from "react";
import { useDispatch } from "react-redux";
import { orderMovies } from "../../redux/actions";
import "./Sort.css"

const Filter = ({setPaginate}) => {
  const dispatch = useDispatch();
  const handlerOrder = (e) => {
    dispatch(orderMovies(e.target.value));
    setPaginate(1)
  };

  return (
    <>
      <div className="containerSort">
      <select className="selectSort" onChange={(e)=>handlerOrder(e)}>
        <option hidden >Sort Popularity</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
