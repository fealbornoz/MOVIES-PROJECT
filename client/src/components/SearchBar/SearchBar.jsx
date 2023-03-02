import React, { useState } from "react";
import { getAllMoviesFilter } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./SearchBar.css";

const SearchBar = ({setPaginate}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllMoviesFilter(input,setPaginate));
    setInput((e.target.name = ""))
  };

  const handleInput = (e) => {
    setInput((e.target.name = e.target.value));
  };

  return (
    <>
      <div className="containerSearchBar">
        <form className="containerFormSearch" onSubmit={(e)=>handleSearch(e)}>
          <input
            placeholder="Search Movies"
            type="text"
            name="input"
            value={input}
            onChange={(e)=>handleInput(e)}
          />
          <button className="buttonSearch">Search</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
