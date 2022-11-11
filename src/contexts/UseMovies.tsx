import { FirebaseError } from "firebase/app";
import React, { createContext, useContext, useState } from "react";
import { IMovie } from '../models/IMovie';

import { IUserMovies } from "../models/IUserMovies";
import { IUserMovieDetails } from "../models/IUserMovieDetails";
import { addDoc, updateDoc, doc, deleteDoc, getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { IAlert } from "../models/IAlert";
//import { DatePicker } from "@mui/lab";
//import { accordionSummaryClasses } from "@mui/material";
import { useFirebase } from "../contexts/FirebaseConnector";
import { useGlobalContext } from "../contexts/GlobalContext";

interface MoviesContextProps { 
  movies: IMovie[];
  moviesLanding: IMovie[];
  userMovies: IUserMovies | null;
  currentMovie: IMovie | null;
  loadingMovie: boolean;
  showMessage: IAlert | undefined;
  getMovies: () => void;
  getUserMovies: (id:string|null|undefined) => void;
  getMovieById: (id: number) => void;
  setCurrentMovie: (thing: IMovie | null) => void;
  addUserMovies: (usermoviedetails: IUserMovieDetails | null, userid: string | null) => void;
  removeUserMovies: (movieid: number | null| undefined, userid: string | null) => void;
  saveUserMovies: (userid: string | null|undefined) => void;
};

const MoviesContext = createContext<MoviesContextProps>({
  movies: [],
  moviesLanding: [],
    userMovies: null,
    currentMovie: null,
  loadingMovie: false,
  showMessage: undefined,
  getMovies: () => { },
  getUserMovies: () => { },
  getMovieById: () => { },
  setCurrentMovie: () => { },
  addUserMovies: () => { },
  removeUserMovies: () => { },
  saveUserMovies: () => { },
});



export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesLanding, setMoviesLanding] = useState<IMovie[]>([]);
  const [moviesLoaded, setMoviesLoaded] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [userMovies, setUserMovies] = useState<IUserMovies | null>(null);
  const { showMessage, setShowMessage } = useGlobalContext();
  const [gotUserMovies, setGotUserMovies] = useState<boolean>(false);
  const { firebaseAuth } = useFirebase();

  //#region getMovies
    const getMovies = React.useCallback(async () => {
      try {
        if (!moviesLoaded)
        {
          setLoadingMovie(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?api_key=a718af3813af65634af0a69e5a0babf4`
          );
          const moviesFromAPI = await response.json();
          setMovies(moviesFromAPI.results);
          setMoviesLanding(moviesFromAPI.results);
          setLoadingMovie(false);
          setMoviesLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    }, [movies, moviesLanding]);
  
    React.useEffect(() => {
      getMovies();
  }, []);  
  //#endregion
  
  //#region getMovieById
    const getMovieById = React.useCallback(async (id:number | null | undefined) => {
      try {
        setLoadingMovie(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=a718af3813af65634af0a69e5a0babf4&language=en-US`
        );
        const movie = await response.json();

        const tempusermovies = userMovies;
        movie.comments = tempusermovies?.movies?.find(m => m.id == movie?.id)?.comments;
        movie.stars = tempusermovies?.movies?.find(m => m.id == movie?.id)?.stars;

        setCurrentMovie(movie);
        setLoadingMovie(false);
        return movie;
      } catch (error) {
        console.error(error);
      }
    }, [currentMovie]);
  
  
  //#endregion
  
  //#region removeUserMovies

  const removeUserMovies = React.useCallback(async (movieid: number | null | undefined, userid: string | null) => {
    try { 
      if (userMovies) {
        const tempusermoviedetails: IUserMovieDetails[] = [];

        userMovies?.movies?.forEach(movie => {
          if (movie.id != movieid) {
            tempusermoviedetails.push(movie);
          }
        });

        const tempusermovies = userMovies;

        tempusermovies.movies = tempusermoviedetails;

        setUserMovies(tempusermovies);
      }
    }
    catch (error) { 
      console.log(error);
    }
  }, [userMovies]);
  
//#endregion

  //#region addUserMovies
    const addUserMovies = React.useCallback(async (usermoviedetails:IUserMovieDetails|null, userid : string|null) => {
      try {
        if (userMovies)
        {
          const tempusermovies = userMovies;

          if (!tempusermovies?.movies?.find(m => m.id == usermoviedetails?.id)) {
            if  (usermoviedetails)
            {
              tempusermovies?.movies?.push(usermoviedetails)
              setUserMovies(tempusermovies);

              let alert: IAlert = { 
                message: "saved",
                type: "secondary",
                show: true
              };

              setShowMessage(alert);
              return;
            }
          }
          else {
            let alert: IAlert = { 
              message: "Movie is already in your list",
              type: "secondary",
              show: true
            };
            
            setShowMessage(alert);  
            return;
          }

        }
        else
        {
          const tempusermovies: React.SetStateAction<IUserMovies> = { userid: null, movies: [] };
          tempusermovies.userid = userid;
          if  (usermoviedetails)
          {
              tempusermovies?.movies?.push(usermoviedetails);
            setUserMovies(tempusermovies);
            
            let alert: IAlert = { 
              message: "saved",
              type: "primary",
              show: true
            };
            
            setShowMessage(alert);
            return;
            }
          
        }
        
          let alert: IAlert = { 
            message: "Error",
            type: "error",
            show: true
          };
          
          setShowMessage(alert);
          

      } catch (error) {
        console.error(error);
        return "error";
      }
    }, [userMovies]);
  //#endregion
  
  //#region saveUserMovies 
    const saveUserMovies = React.useCallback(async (userid : string|null|undefined) => {
      try {
        //const delDocs = await deleteDocInFirebase(userid);

        const q = query(
          collection(getFirestore(), "userMovies"),
          where("userid", "==", userid)
        );  
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size <= 0) {
          const docRef = await addDoc(collection(getFirestore(), "userMovies"), {
            userid: userid,
            userMovies,
          });
          console.log("Document written with ID: ", docRef.id);
        }
        else { 
          querySnapshot.forEach((document) => {
            updateDoc(doc(getFirestore(), `/userMovies/${document.id}`),  {
              userid: userid,
              userMovies,
            });
          });
          

        }

        let alert: IAlert = {
          message: "Saved in DB",
          type: "primary",
          show: true,
        }

        setShowMessage(alert);

      } catch (error) {
        console.log(error);
        let alert: IAlert = {
          message: "Error saving list to DB",
          type: "error",
          show: true,
        }

        setShowMessage(alert);
      }
    },  [userMovies]);
  //#endregion
  
  //#region deleteDocInFirebase 
  /*const deleteDocInFirebase = async (userid: string | null |undefined) => 
  { 
    const q = query(
      collection(getFirestore(), "userMovies"),
      where("userid", "==", userid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      deleteDoc(doc(getFirestore(), `/userMovies/${document.id}`));
    });
  }*/
  //#endregion
  
  //#region getUserMovies
  const getUserMovies = React.useCallback(async (id:string | null | undefined) => {
    try {
    if (!gotUserMovies)
    {
      const q = query(
        collection(getFirestore(), "userMovies"),
        where("userid", "==", id)
      );
      const querySnapshot = await getDocs(q);
      
      let userMoviesFromFirebase: React.SetStateAction<IUserMovies> = { userid: null, movies: [] };

      querySnapshot.docs.forEach((document) => {
        userMoviesFromFirebase = { ...(document.data().userMovies as IUserMovies) };
      });
    
      if (userMoviesFromFirebase?.movies)
        setGotUserMovies(true);

      setUserMovies(userMoviesFromFirebase);
    }
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  React.useEffect(() => {
    if (firebaseAuth)
      getUserMovies(firebaseAuth?.uid);
  }, [firebaseAuth]);
  //#endregion
  
  //#region contextValue:MoviesContextProps 
    const contextValue:MoviesContextProps = {
      movies,
      moviesLanding,
      userMovies,
        currentMovie,
      loadingMovie,
        showMessage,
      getMovies,
      getUserMovies,
      getMovieById,
      setCurrentMovie,
      addUserMovies,
      removeUserMovies,
      saveUserMovies,
    };
  //#endregion

    return (
      <MoviesContext.Provider value={contextValue}>
        {children}
      </MoviesContext.Provider>
    );
};
  
export const useMovies = () => useContext<MoviesContextProps>(MoviesContext);