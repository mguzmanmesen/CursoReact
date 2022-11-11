import React from "react";
//import React, { PropsWithChildren, useState, MouseEvent  } from "react";
import { useMovies } from "../../contexts/UseMovies";
import { MovieInformation } from "./MovieInformation";
import { SingleMovie } from "../molecules/SingleMovie";
import { SingleMovieLanding } from "../molecules/SingleMovieLanding";
import { useFirebase } from "../../contexts/FirebaseConnector";
//import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { SingleAlertMessage } from '../molecules/SingleAlertMessage';
//import { syncBuiltinESMExports } from "module";
import '../../styles/buttonstyle.sass';
import { SingleButton } from '../atoms/singlebutton';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useGlobalContext } from "../../contexts/GlobalContext";

export const ListMovies = ({ isLandingPage }: { isLandingPage: boolean | undefined} ): ReactJSXElement => {
  const { movies, moviesLanding, loadingMovie, currentMovie, userMovies, showMessage } = useMovies();
  const { setShowMessage} = useGlobalContext();
  
  if (loadingMovie) {
    return <p>Cargando lista...</p>;
  }

  if (currentMovie) {
    return <MovieInformation />;
  }

  if (!isLandingPage) {
    return (
      <div style={{backgroundColor:"black"}}>
        {showMessage?.show ? <SingleAlertMessage message={showMessage.message} type={showMessage.type} show={showMessage.show} /> : <></>}
        <table>
          <tbody>
          <tr>
            <td style={{ width: "50%" }}>
            {movies ? <div >
                <div  style={{ fontFamily: "revert", fontSize: "xxx-large", textAlign:"center", backgroundColor:"cornsilk" }}>Trending</div>
                <Carousel showThumbs={false}>
                  {movies.map((movie) => (
                    <SingleMovie key={movie.id} id={movie.id} name={movie.name} adult={false} backdrop_path={movie.backdrop_path} media_type={""} original_title={""} 
                      title={movie.title} overview={""} popularity={0} poster_path={""} comments={""} stars={0} />))}
                </Carousel>
                </div> : <div  style={{ fontFamily: "revert", fontSize: "xxx-large", textAlign:"center", backgroundColor:"cornsilk" }}>Loading</div>} 
                {userMovies ? <div style={{textAlign:"center"}}>
                <div  style={{ fontFamily: "revert", fontSize: "xxx-large", textAlign:"center", backgroundColor:"cornsilk" }}>Your Trending Movies</div>
                <Carousel showThumbs={false}>
                    {userMovies?.movies?.map((movie) => (
                      <SingleMovie key={movie.id} id={movie.id} name={movie.name} backdrop_path={movie.backdrop_path} title={movie.title}
                        comments={""} stars={0}/>))}
                  </Carousel>
                  <br/>
                <SingleButton message={"Save Your List"} style={"buttonIn"} />
              </div> : <div  style={{ fontFamily: "revert", fontSize: "xxx-large", textAlign:"center", backgroundColor:"cornsilk" }}>Loading</div>} 
            </td>
            <td style={{ width: "50%", backgroundColor:"beige", verticalAlign:"baseline" }}>
              <h1>What is Lorem Ipsum?</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <h1> Where does it come from?</h1>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </p>
              </td>
            </tr>
            </tbody>
        </table>  
      </div>
    )
  }

  return (
    <div style={{backgroundColor:"black"}}>
        {showMessage?.show ? <SingleAlertMessage message={showMessage.message} type={showMessage.type} show={showMessage.show} /> : <>{setShowMessage(undefined)}</>}
      <table>
        <tbody>
          <tr>
            <td >
              <div >
                <div  style={{ fontFamily: "revert", fontSize: "xxx-large", textAlign:"center", backgroundColor:"cornsilk" }}>Trending</div>
                  <Carousel showThumbs={false}>
                    {moviesLanding.map((moviel) => (
                      <SingleMovieLanding key={moviel.id} id={moviel.id} name={moviel.name}
                        adult={false} backdrop_path={moviel.backdrop_path} media_type={""} original_title={""}
                        title={moviel.title} overview={""} popularity={0} poster_path={""} comments={""} stars={0} />))}
                  </Carousel>
              </div>
            </td>
            <td style={{ width: "50%", backgroundColor:"beige", verticalAlign:"baseline" }}>
              <h1>What is Lorem Ipsum?</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <h1> Where does it come from?</h1>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </p>
              </td>
          </tr>
          </tbody>
        </table>  
      </div>
  );

};


