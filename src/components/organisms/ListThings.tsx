import React from "react";
import { useThings } from "../../contexts/UseThings";
import { ThingInformation } from "./ThingInformation";
import { SingleThing } from "../molecules/SingleThing";

export const ListThings = () => {
  const { things, loadingThings, getThings, thingCurrent } = useThings();

  React.useEffect(() => {
    getThings();
  }, [getThings]);

  if (loadingThings) {
    return <p>Cargando lista...</p>;
    console.log(thingCurrent);
  }

  if (thingCurrent) {
    return <ThingInformation />;
  }

  return (
    <ul>
      {things.map((thing) => (
        <SingleThing key={thing.id} id={thing.id} title={thing.title} userId={0} completed={true}  /> 
        
      ))}
    </ul>
  );
};