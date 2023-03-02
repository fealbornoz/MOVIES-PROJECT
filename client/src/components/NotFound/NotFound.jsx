import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="containerNotFound">
        <Link to="/home">
          <button className="buttonNotFound">Back</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
