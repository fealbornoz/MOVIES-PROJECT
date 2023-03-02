import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  return( <>
  <div className="containerGlobal">

  <div className="containerLanding">
  <h1>Popular Movies</h1>
  <Link to="/home">
    <button>Home</button>
  </Link>
  </div>
  </div>
  </>
  )
};

export default LandingPage;
