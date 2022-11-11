import React, { useState } from "react";
import "../../styles/signup.css";
import { useMovies } from "../../contexts/UseMovies";
import { useFirebase } from "../../contexts/FirebaseConnector";
import { Formik } from "formik";
//import { Alert, TextField, Typography } from "@mui/material";
import {  TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IUserMovieDetails } from "../../models/IUserMovieDetails";
import { useNavigate } from "react-router-dom";
//import { ClassNames } from "@emotion/react";
import ReactStars from  "react-stars" 
//import { render } from "react-dom";


const firstExample = {
  size: 40,
  value: 0,
  color: "gray",
  isHalf: true,
  activeColor: "yellow",
  emptyIcon: <i className="far fa-star" />,
  halfIcon: <i className="fa fa-star-half-alt" />,
  filledIcon: <i className="fa fa-star" />
};

export const MovieInformation = () => {
  const { currentMovie, userMovies, getMovieById, setCurrentMovie, addUserMovies, removeUserMovies } = useMovies();
  const { firebaseAuth } = useFirebase();
  const [stars, setStars] = useState<number>(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentMovie?.comments)
    {
      if (userMovies?.movies?.find(m=> m.id == currentMovie?.id))
        getMovieById(currentMovie?.id!);
        //setStars(currentMovie?.stars ? currentMovie?.stars : 0);
    }
  }, []);
  

  const onClickBack = () => {
    setCurrentMovie(null);
  };

  const onClickRemove = async () => {
    if (currentMovie && firebaseAuth)
    {
      removeUserMovies(currentMovie.id, firebaseAuth?.uid);
      setCurrentMovie(null);
      return;
    }

    if (!firebaseAuth) {
      setCurrentMovie(null);
      navigate("/Login")
    }
    else { 
      setCurrentMovie(null);
    }
  }

  const ratingChanged = (newRating : number) => {
    console.log(newRating)
    setStars(newRating);
    currentMovie!.stars! = newRating;
  }

  const onClickAdd = async (values: IUserMovieDetails) => {
    if (currentMovie && firebaseAuth)
    {
      values.stars = stars;
      addUserMovies(values, firebaseAuth?.uid);
      setCurrentMovie(null);
      return;
    }

    if (!firebaseAuth) {
      setCurrentMovie(null);
      navigate("/Login")
    }
    else { 
      setCurrentMovie(null);
    }
    
  };
    
  if (currentMovie?.comments == "")
    return (<div>Loading</div>);

  
  
  return (
    <main>
    <div>
      <h2>{currentMovie?.title}</h2>
      <p>{currentMovie?.overview}</p>
      {currentMovie?.comments != null ? <button onClick={onClickRemove}>Remove from my list</button> : <></> } 
      <button onClick={onClickBack}>Back</button>
      <ReactStars count={5} onChange={ratingChanged} value={currentMovie?.stars ? currentMovie?.stars : 0} size={35} color2={'#ffd700'} />
      
          <br/>
      
          <Formik<IUserMovieDetails>
              initialValues={{
              id: currentMovie?.id,
              comments: currentMovie?.comments,
              backdrop_path: currentMovie?.backdrop_path,
              title: currentMovie?.title ? currentMovie?.title : currentMovie?.name,
              name: currentMovie?.name ? currentMovie?.name : currentMovie?.title,
              stars: currentMovie?.stars, 
          }}
          onSubmit={onClickAdd}
          validateOnBlur
          validateOnChange
          validateOnMount
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            isValidating,
          }) => (
            <form onSubmit={handleSubmit}>
            <TextField
                error={touched.comments && !!errors.comments}
                required
                label="Comments"
                type="text"
                placeholder="My review"
                value={values.comments}
                onChange={handleChange("comments")}
                onBlur={handleBlur("comments")}
                helperText={touched.comments && errors.comments}
              />

              <LoadingButton
                loading={isSubmitting || isValidating}
                disabled={!isValid}
                variant="outlined"
                type="submit"
              >
                Add Movie to my list
              </LoadingButton>
            </form>
          )}
        </Formik>
      <br />
      
      </div>
    </main>
  );
};