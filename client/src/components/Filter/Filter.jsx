import React from "react";
import { useDispatch } from "react-redux";
import { filterMovies } from "../../redux/actions";
import "./Filter.css";

const Filter = ({ setPaginate }) => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(filterMovies(e.target.value));
    setPaginate(1);
  };

  return (
    <>
      <div className="containerFilter">
        <select onChange={(e)=>handleFilter(e)}>
          <option hidden>Filter By Genres</option>
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Music">Music</option>
          <option value="Mistery">Mistery</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="TV Movie">TV Movie</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
