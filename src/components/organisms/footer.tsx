import React, { PropsWithChildren, useState } from "react";
import '../../styles/header.sass';

export const Footer: React.FC<PropsWithChildren> = ({ children }) => {

    const styles: { [key: string]: React.CSSProperties } = {
       
    } as const ;

  return (
        <footer className="footerstyle" >
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
