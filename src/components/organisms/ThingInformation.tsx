import React from "react";
import { useThings } from "../../contexts/UseThings";
//import { IThing } from "../../models/IThing";

export const ThingInformation = () => {
  const { thingCurrent, setThingCurrent } = useThings();

  const onClick = () => {
    setThingCurrent(undefined);
  };

  return (
    <div>
      <h2>{thingCurrent?.title}</h2>
      <p>{thingCurrent?.completed ? "Completado" : "Pendiente"}</p>
      <button onClick={onClick}>Atrás</button>
    </div>
  );
};