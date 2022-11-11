import React, { PropsWithChildren, useState } from "react";

export const Footer: React.FC<PropsWithChildren> = ({ children }) => {

    const styles: { [key: string]: React.CSSProperties } = {
        footerstyle: {
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
        }   
    } as const ;

  return (
        <footer className=".footerstyle" style={{
        textAlign: "center",
        backgroundColor: "black",
          color: "white",
      fontSize:"12px"}} >
          <p style={{ display: "contents" }}>
              This is a footer - This is a footer - This is a footer - This is a footer - This is a footer - This is a footer
          </p>
            <br/>
          <p style={{ display: "contents" }}>
              This is a footer - This is a footer - This is a footer - This is a footer
          </p>
        </footer>
);
};
