import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetail, cleanDetail } from "../../redux/actions";
import Form from "../Form/Form";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const EditMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const editDetail = useSelector((state) => {
    return state.movieDetail;
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // despacho solo si es "UUIDV4"
    if (isNaN(Number(id))) {
      dispatch(getMovieDetail(id, setLoading));
    }

    return () => dispatch(cleanDetail());
  }, [dispatch, id]);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <>
      <div>
        <Form id={id} editDetail={editDetail} />
      </div>
    </>
  );
};

export default EditMovie;
