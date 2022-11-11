import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";
import { HomePage } from "../components/features/index";
import { NotFoundPage } from "../components/features/404";
import { Login } from "../components/features/Login";
import { SignUp } from "../components/features/SignUp";
import { AuthPage } from "../components/features/AuthPage";
import { LandingPage } from "../components/features/LandingPage";
import { FirebaseProvider } from "../contexts/FirebaseConnector";
import { MoviesContextProvider, useMovies } from "../contexts/UseMovies";
import { GlobalContextProvider, useGlobalContext } from "../contexts/GlobalContext";

export const Routes = () => {
  return (
    <Router>
      <GlobalContextProvider>
      <FirebaseProvider>
      <MoviesContextProvider>
        <RouterRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
                 <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/404" element={<NotFoundPage />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </RouterRoutes>
          </MoviesContextProvider>
        </FirebaseProvider>
        </GlobalContextProvider>
    </Router>
  );
};