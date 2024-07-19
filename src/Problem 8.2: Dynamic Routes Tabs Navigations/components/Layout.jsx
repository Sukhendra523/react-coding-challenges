import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from "./Tabs";

const Layout = () => {
  return (
    <div>
      <Tabs />
      <Outlet />
    </div>
  );
};

export default Layout;
