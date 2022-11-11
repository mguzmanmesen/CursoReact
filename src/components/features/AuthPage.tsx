import React, { PropsWithChildren } from "react";
import { useFirebase } from "../../contexts/FirebaseConnector";
import { useNavigate } from "react-router-dom";

export const AuthPage: React.FC<PropsWithChildren> = ({ children }) => {
  const { firebaseUser } = useFirebase();
  const navigate = useNavigate();

    React.useEffect(() => {
        console.log(firebaseUser);
      if (firebaseUser) {
        navigate("/");
      }
  }, [firebaseUser]);

  if (firebaseUser) {
    navigate("/");
  }

  return <>{children}</>;
};