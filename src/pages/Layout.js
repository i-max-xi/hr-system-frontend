import { Outlet } from "react-router-dom";
import React from "react";
//

const Layout = () => {


  return (
    <>
      {/* <Nav /> */}

      <Outlet />
      {/* <ScrollTop className="bg-warning" /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
