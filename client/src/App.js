import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Form from "./components/Form/Form";
import EditMovie from "./components/EditMovie/EditMovie";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="*" element={<NotFound/>} />
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:id" element={<MovieDetail/>} />
        <Route exact path="/form" element={<Form/>} />
        <Route exact path="/edit/:id" element={<EditMovie/>} />
      </Routes>
    </div>
  );
}

export default App;
