import { useLocation } from "react-router-dom";

export const NotFoundPage = () => {
  const location = useLocation();
  return <div>404 para ruta {location.pathname}</div>;
};


