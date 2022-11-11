import {  useState  } from "react";
import '../../styles/buttonstyle.sass';
import { useMovies } from "../../contexts/UseMovies";
import { useFirebase } from "../../contexts/FirebaseConnector";
import ReactDOM from 'react-dom';

interface button { 
    message:string,
style:string,
}

export const SingleButton = ({ message, style }:button ) => {
    const [hover, setHover] = useState<boolean>(false);
    const { saveUserMovies } = useMovies();
    const { firebaseAuth } = useFirebase();

    const handleMouseOver = () => {
        setHover(true);
      };

      const handleMouseOut = () => {
        setHover(false);
      };
    
      const saveMovies = () => {
        try {
          saveUserMovies(firebaseAuth?.uid);
          
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <>
            <button className={hover ? "buttonIn" : "buttonOut"}  onClick={saveMovies} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >{message}</button>
        </>
    );
    
};