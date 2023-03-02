import React, {useState} from "react";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Order from "../Sort/Sort";
import { Link } from "react-router-dom";
import { getAllMovies} from "../../redux/actions";
import {  useDispatch } from "react-redux";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import "./Header.css";
const Header = ({setPaginate}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const handleReset = (e)=>{
    dispatch(getAllMovies(setLoading))
    setPaginate(1)
  }

  if (loading) {
    return <LoadingPage />;
  }


  return (
    <>
      <div className="containerHeader">
        <div className="containerSearch">
          <SearchBar setPaginate={setPaginate}/>
        </div>
        <div className="containerSelect">
          <Order setPaginate={setPaginate}/>
          <Filter setPaginate={setPaginate}/>
        </div>
        <div className="containerButtonsHeader">
        <Link className="linkMovie" to="/form"><button className="buttonHeaderForm">New Movie</button></Link>
        <button className="buttonHeaderReset" onClick={(e)=>handleReset(e)}>Reset Page</button>
        </div>
      </div>
    </>
  );
};

export default Header;
