import React, { useState } from "react";
import validate from "./validate";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMovie, updateMovie } from "../../redux/actions";
import { postImageToCloudinary } from "../../utils/functions";
import { Link } from "react-router-dom";
import "./Form.css";

const Form = ({ id, editDetail }) => {
  const [form, setForm] = useState({
    title: "",
    image:
      "https://res.cloudinary.com/dtsc0hcla/image/upload/v1677717332/mfjrtrdorjv0awfaearr.webp",
    overview: "",
    release_date: "",
    genres: "",
    popularity: "",
  });

  const [error, setError] = useState({
    titleError: "",
    imageError: "",
    overviewError: "",
    release_dateError: "",
    genresError: "",
    popularityError: "",
  });

  const setImage = async (e) => {
    const result = await postImageToCloudinary(e);
    console.log(result);
    if (result) {
      setForm({ ...form, [e.target.name]: result });
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const edit = () => {
    return id && Object.keys(editDetail).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!edit()) {
      if (Object.values(error).length !== 0) {
        alert("Complete the data");
      } else if (Object.values(error).length === 0) {
        dispatch(createMovie(form, navigate));
        // navigate("/home");
        setForm({
          ...form,
          title: "",
          image: "",
          overview: "",
          release_date: "",
          genres: "",
          popularity: "",
        });
      }
    } else {
      dispatch(updateMovie(id, form, navigate));
      // navigate("/home");
    }
  };
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
    setError(validate({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="containerFormGlobal">
        <div className="containerForm">
          <form onSubmit={handleSubmit}>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Title
              </label>
              <input
                className={error.titleError ? "inputError" : "inputCorrect"}
                type="text"
                name="title"
                onChange={(e) => handleInput(e)}
                value={form.title}
              />
              <div className="containerError">
                {error.titleError && (
                  <span className="error">{error.titleError}</span>
                )}
              </div>
            </div>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Image
              </label>
              <div className="fileForm">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    return setImage(e);
                  }}
                />
                <div className="containerError">
                  {error.imageError && (
                    <span className="error">{error.imageError}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Overview
              </label>
              <textarea
                className={
                  error.overviewError ? "inputErrorArea" : "inputCorrectArea"
                }
                type="text"
                name="overview"
                onChange={(e) => handleInput(e)}
                value={form.overview}
              />
              <div className="containerError">
                {error.overviewError && (
                  <span className="error">{error.overviewError}</span>
                )}
              </div>
            </div>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Release Date
              </label>
              <input
                className={
                  error.release_dateError ? "inputError" : "inputCorrect"
                }
                type="date"
                name="release_date"
                onChange={(e) => handleInput(e)}
                value={form.release_date}
              />
              <div className="containerError">
                {error.release_dateError && (
                  <span className="error">{error.release_dateError}</span>
                )}
              </div>
            </div>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Genres
              </label>
              {/* <input
              className={error.genresError? "inputError": "inputCorrect"}
                type="text"
                name="genres"
                onChange={(e)=>handlerInputChange(e)}
                value={form.genres}
              /> */}
              <select
                className={error.genresError ? "inputError" : "inputCorrect"}
                name="genres"
                onChange={(e) => handleInput(e)}
              >
                <option hidden>Genres</option>
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
              <div className="containerError">
                {error.genresError && (
                  <span className="error">{error.genresError}</span>
                )}
              </div>
            </div>
            <div className="boxInput">
              <label className="labelForm" htmlFor="">
                Popularity
              </label>
              <input
                className={
                  error.popularityError ? "inputError" : "inputCorrect"
                }
                type="text"
                name="popularity"
                onChange={(e) => handleInput(e)}
                value={form.popularity}
              />
              <div className="containerError">
                {error.popularityError && (
                  <span className="error">{error.popularityError}</span>
                )}
              </div>
            </div>
            <div className="containerButton">
              <button className="buttonSubmitForm" type="submit">
                Submit
              </button>
              <Link className="linkForm" to="/home">
                <button className="buttonBackForm">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
