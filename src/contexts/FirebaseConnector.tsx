import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import {
    getAuth, signInWithEmailAndPassword, UserCredential, User,
    createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence
} from "firebase/auth";
import React, { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { IAlert } from "../models/IAlert";
import { useGlobalContext } from "./GlobalContext";

const firebaseCredentials: FirebaseOptions = {
    /*apiKey: "AIzaSyD95ji-YsFNSLJGhftnEI8lydL7uYZPHg0",
    authDomain: "reactlearning-6bddc.firebaseapp.com",
  projectId: "reactlearning-6bddc",
  storageBucket: "reactlearning-6bddc.appspot.com",
  messagingSenderId: "595215303960",
  appId: "1:595215303960:web:f875b684448e46d572ca6d",
  measurementId: "G-SPWGKNTSH0"*/
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

export interface FirebaseContextProps{ 
    app: FirebaseApp | null; 
    firebaseUser: UserCredential | undefined | null;
    firebaseAuth: User | undefined | null;
    hasAuthLoaded: boolean;
    showLogin: boolean;
    setShowLogin: (showLogin:boolean) => void;
    login: (email: string, password: string) => Promise<UserCredential | undefined>;
    register: (email: string, password: string) => Promise<UserCredential | undefined>;
    logout: () => Promise<void>;
    authStateChanged: (user: User  | null) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextProps>({
    app: null,
    firebaseUser: undefined,
    firebaseAuth: undefined,
    hasAuthLoaded: true,
    showLogin: true,
    setShowLogin: () => { },
    login: () => Promise.resolve(undefined),
    register: () => Promise.resolve(undefined),
    logout: () => Promise.resolve(undefined),
    authStateChanged: () => Promise.resolve(undefined),
});

export const FirebaseProvider = ({ children }: any) => {
    const [app, setApp] = React.useState<FirebaseApp | null>(null);
    const [firebaseUser, setFirebaseUser] = React.useState<UserCredential | undefined | null>(undefined);
    const [firebaseAuth, setFirebaseAuth] = React.useState<User | undefined | null>(undefined);
    const [hasAuthLoaded, setHasAuthLoaded] = React.useState(true);
    const [showLogin, setShowLogin] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const { setShowMessage } = useGlobalContext();


    //#region login
    const login = React.useCallback(async (email: string, password: string) => {
        try {
            const auth = getAuth();
            const user = await setPersistence(auth, browserSessionPersistence).then(() => {

                return signInWithEmailAndPassword(auth, email, password);
                
            });

            setHasAuthLoaded(true);
            setFirebaseUser(user);
            setFirebaseAuth(user.user);
            setShowLogin(false);

            return user;
          } catch (error) {
            console.error(error);
          }
    }, []);
    //#endregion

    //#region register
    const register = React.useCallback(async (email: string, password: string) => {
        try {
            console.log(email);
            console.log(password);

            const auth = getAuth();

            console.log("despues del getauth" + auth);
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log("despues del create" + user);
            setFirebaseUser(user);
            setFirebaseAuth(user.user);
            setHasAuthLoaded(true);
            setShowLogin(false);
            console.log("despues de setear firebaseuser");
      
            return user;
        } catch (error) {
            console.error(error);

            let alert: IAlert = {
                message: "Error creating your user. ",
                type: "error",
                show: true,
            }

            setShowMessage(alert);

        }
    },[]);
    //#endregion
   
    //#region logout
    const logout = React.useCallback( async () => {
        try {
            setFirebaseUser(null);
            setFirebaseAuth(null);
            setHasAuthLoaded(false);
            setShowLogin(true);
            const auth = getAuth();
            signOut(auth);
            navigate("/LandingPage");
        }
        catch(error) {
            console.error(error);
        }
    },[]);
    //#endregion

    //#region  initializeApp
    React.useEffect(() => {
        setShowLogin(true);
        const app = initializeApp(firebaseCredentials);
        setApp(app);
    }, []);
    //#endregion

    //#region authStateChanged
    const authStateChanged =
        async (user: User | undefined |null) => {
            if (!user) {
                setHasAuthLoaded(false);
                navigate("/LandingPage")
                return;
            }
    
            setFirebaseAuth(user);
            setHasAuthLoaded(true);
        };
    
    React.useEffect(() => {
            const unsubscribe = getAuth().onAuthStateChanged(authStateChanged);
            return () => unsubscribe();
          }, []);
    //#endregion
    
    //#region contextValue: FirebaseContextProps
    const contextValue: FirebaseContextProps = {
        app,
        firebaseUser,
        firebaseAuth,
        hasAuthLoaded,
        showLogin,
        setShowLogin,
        login,
        register,
        logout,
        authStateChanged,
    };
    //#endregion
    

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext<FirebaseContextProps>(FirebaseContext);
