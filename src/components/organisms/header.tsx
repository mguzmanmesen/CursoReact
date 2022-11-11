import React, { PropsWithChildren, useState } from "react";
import '../../styles/header.sass';
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../contexts/FirebaseConnector";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
    const { logout, showLogin} = useFirebase();
    const navigate = useNavigate();

    const clickheader = () => {
        navigate("/LandingPage");
    };

    const clickLogin = () => {
        navigate("/Login");
    };

    const clickRegister = () => {
        navigate("/SignUp");
    };
    
    const clickLogout = () => {
        logout();
    };

    

    const styles: { [key: string]: React.CSSProperties } = {
        buttondiv: {
            float: "right",
        },
        button: {
            alignItems: "center",          
            backgroundColor: "#fff",
            border: "2px solid #000",
            color: "#000",
            fontWeight: "600",
            minWidth: "100px",
            height: "48px",
            justifyContent: "center",
            display: "block",
            marginTop: "2px",
            paddingLeft: "5px",
        },
      } as const;
    
    if (showLogin) { 
        return (
            <header className="Header" style={{ borderBottomColor: "beige", borderBottomWidth:"12px", borderBottomStyle:"dotted" }}>
                  <span onClick={clickheader}>Movies</span>
                      <div style={{ float: "right", fontSize: "60%" }}>
                      <div style={styles.buttondiv}><button style={styles.button} onClick={clickLogin}>Login</button></div>
                      <div style={styles.buttondiv}><button style={styles.button} onClick={clickRegister}>Register</button></div></div>
              </header>
        );

    }
    
    
  return (
        <header className="Header" style={{ borderBottomColor: "beige", borderBottomWidth:"12px", borderBottomStyle:"dotted" }}>
              <span onClick={clickheader}>Movies</span>
              <div style={{ float: "right", fontSize: "60%" }}>
                    <div style={{ float: "left", paddingTop:"10px", paddingRight:"10px" }}>Welcome</div>
                    <div style={styles.buttondiv}><button style={styles.button} onClick={clickLogout}>Logout</button></div>
            </div>
          </header>
    );
};

