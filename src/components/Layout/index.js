import React from "react";
import HeaderTwitter from "@components/Header";
import "./index.css";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderTwitter />
      <div className="contentWrapper">{children}</div>
    </div>
  );
};

export default Layout;
