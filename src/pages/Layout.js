import { Outlet } from "react-router-dom";
import React from "react";
import { Nav } from "../components";
//

const Layout = () => {
  return (
    <>
      <Nav />

      <Outlet />
    </>
  );
};

export default Layout;
