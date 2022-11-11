import { useThings } from "../../contexts/UseThings";
import { IThing } from "../../models/IThing";

/*export const Thing = () => {
  const { things, loadingThings, getThings, thingCurrent } = useThings();*/

export const SingleThing = ({ id, title }: IThing) => {
  const { getThingById } = useThings();

  const manejarClick = () => {
    try {
      console.log(id + ' id del thing');
      getThingById(id);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li onClick={manejarClick} key={id}>
      {title}
    </li>
  );
};