import React, { createContext, useContext, useState } from "react";
import { IThing } from '.././models/IThing';


interface ThingsContextProps { 
  things: IThing[];
  thingCurrent: IThing | undefined;
  loadingThings: boolean;
  getThings: () => void;
  getThingById: (id : number) => void;
  setThingCurrent: (thing: IThing | undefined ) => void;
};

const ThingsContext = createContext<ThingsContextProps>({
  things: [],
  thingCurrent: undefined,
  loadingThings: false,
  getThings: () => {},
  getThingById: () => {},
  setThingCurrent: () => {},
});

export const ThingsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [things, setThings] = useState<IThing[]>([]);
  const [thingCurrent, setThingCurrent] = useState<IThing | undefined>(undefined);
  const [loadingThings, setLoadingThings] = useState(false);

  const getThings = React.useCallback(async () => {
    try {
      setLoadingThings(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const items = await response.json();
      setThings(items);
      setLoadingThings(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getThingById = React.useCallback(async (id:number) => {
    try {
      setLoadingThings(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const thing = await response.json();
      setThingCurrent(thing);
      setLoadingThings(false);
      console.log(thing);
      return thing;
    } catch (error) {
      console.error(error);
    }
  }, []);

  // React.useEffect(() => {
  //   obtenerTodos();
  // }, [obtenerTodos]);

  const contextValue:ThingsContextProps = {
    things,
    thingCurrent,
    loadingThings,
    getThings,
    getThingById,
    setThingCurrent,
  };

  return (
    <ThingsContext.Provider value={contextValue}>
      {children}
    </ThingsContext.Provider>
  );
};

export const useThings = () => useContext<ThingsContextProps>(ThingsContext);