import { createContext, useContext, useState } from "react";
import { IAlert } from "../models/IAlert";



interface GlobalContextProps {
    showMessage: IAlert | undefined;
    setShowMessage: (showMessage:IAlert | undefined ) => void;
};


const GlobalContext = createContext<GlobalContextProps>({
    showMessage: undefined,
    setShowMessage: () => { },
});



export const GlobalContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [showMessage, setShowMessage] = useState<IAlert | undefined>(undefined);

    const contextValue: GlobalContextProps = {
        showMessage,
        setShowMessage,
    }


    return (
        <GlobalContext.Provider value={contextValue}>
          {children}
        </GlobalContext.Provider>
      );
}

export const useGlobalContext = () => useContext<GlobalContextProps>(GlobalContext);