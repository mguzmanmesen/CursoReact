import { IMovie } from "../../models/IMovie";



export const SingleMovieLanding = ({ id, title, name, backdrop_path }: IMovie) => {
  const url = "https://image.tmdb.org/t/p/w500"; 


  return (
    <div key={id}>
      <div style={{ display: "flex",color:"white"}}>{title ? title : name}</div>
      <img src={url + backdrop_path} ></img>
      
      
    </div>
  );
};