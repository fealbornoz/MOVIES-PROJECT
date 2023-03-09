import React, { useState,useEffect} from "react";
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

 

  useEffect(()=>{
    if(id && Object.keys(editDetail).length){
      setForm({ title: editDetail.title,
        image:
        editDetail.image,
        overview: editDetail.overview,
        release_date: editDetail.release_date,
        genres: editDetail.genres,
        popularity: editDetail.popularity,})
    }
  },[editDetail,id])



  const setImage = async (e) => {
    const result = await postImageToCloudinary(e);
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
        return alert("It was successfully created");
      }
    } else {
      dispatch(updateMovie(id, form, navigate));
      return alert("It was successfully edited");
    }
  };
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                <div className="containerImage">
                  <img
                    className="image"
                    src={form.image}
                    alt="imagen"
                  />
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
                <option
                  value="Action"
                  
                  selected={edit() && editDetail.genres === "Action"? "selected" : "" }
                >
                  Action
                </option>
                <option
                  value="Adventure"
                  selected={edit() && editDetail.genres === "Adventure"? "selected" : "" }
                >
                  Adventure
                </option>
                <option
                  value="Animation"
                  selected={edit() && editDetail.genres === "Animation"? "selected" : "" }
                >
                  Animation
                </option>
                <option
                  value="Comedy"
                  selected={edit() && editDetail.genres === "Comedy"? "selected" : "" }
                >
                  Comedy
                </option>
                <option
                  value="Crime"
                  selected={edit() && editDetail.genres === "Crime"? "selected" : "" }
                >
                  Crime
                </option>
                <option
                  value="Documentary"
                  selected={edit() && editDetail.genres === "Documentary"? "selected" : "" }
                >
                  Documentary
                </option>
                <option
                  value="Drama"
                  selected={edit() && editDetail.genres === "Drama"? "selected" : "" }
                >
                  Drama
                </option>
                <option
                  value="Family"
                  selected={edit() && editDetail.genres === "Family"? "selected" : "" }
                >
                  Family
                </option>
                <option
                  value="Fantasy"
                  selected={edit() && editDetail.genres === "Fantasy"? "selected" : "" }
                >
                  Fantasy
                </option>
                <option
                  value="History"
                  selected={edit() && editDetail.genres === "History"? "selected" : "" }
                >
                  History
                </option>
                <option
                  value="Horror"
                  selected={edit() && editDetail.genres === "Horror"? "selected" : "" }
                >
                  Horror
                </option>
                <option
                  value="Music"
                  selected={edit() && editDetail.genres === "Music"? "selected" : "" }
                >
                  Music
                </option>
                <option
                  value="Mistery"
                  selected={edit() && editDetail.genres === "Mistery"? "selected" : "" }
                >
                  Mistery
                </option>
                <option
                  value="Romance"
                  selected={edit() && editDetail.genres === "Romance"? "selected" : "" }
                >
                  Romance
                </option>
                <option
                  value="Science Fiction"
                  selected={edit() && editDetail.genres === "Science Fiction"? "selected" : "" }
                >
                  Science Fiction
                </option>
                <option
                  value="TV Movie"
                  selected={edit() && editDetail.genres === "TV Movie"? "selected" : "" }
                >
                  TV Movie
                </option>
                <option
                  value="Thriller"
                  selected={edit() && editDetail.genres === "Thriller"? "selected" : "" }
                >
                  Thriller
                </option>
                <option
                  value="War"
                  selected={edit() && editDetail.genres === "War"? "selected" : "" }
                >
                  War
                </option>
                <option
                  value="Western"
                  selected={edit() && editDetail.genres === "Western"? "selected" : "" }
                >
                  Western
                </option>
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
