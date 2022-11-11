import { useMovies } from "../../contexts/UseMovies";
import { IMovie } from "../../models/IMovie";
import { IUserMovieDetails } from "../../models/IUserMovieDetails";


export const SingleMovie = ({ id, title, name, backdrop_path }: IMovie | IUserMovieDetails) => {
  const { getMovieById } = useMovies();
  const url = "https://image.tmdb.org/t/p/w500"; 

  const handleClick = () => {
    try {
      console.log(id + ' id del thing');
      if (id)
        getMovieById(id);
      
    } catch (error) {
      console.error(error);
    }
  };

  if (id==null)
    return (
      <>Loading</>);
    
    
  return (
    <div onClick={handleClick} key={id} style={{ backgroundColor:"black"}}>
      <div style={{ display: "flex",color:"white"}}>{title ? title : name}</div>
        <img src={url + backdrop_path} ></img>
    </div>
  );
};