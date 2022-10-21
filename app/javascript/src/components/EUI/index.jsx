import React, { useState } from "react";

import { ProSidebarProvider } from "react-pro-sidebar";

import Authenticate from "./Authenticate";
import SideMenu from "./SideMenu";

const Eui = ({ status, history }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  {
    return status && !loggedIn ? (
      <Authenticate setLoggedIn={setLoggedIn} />
    ) : (
      <ProSidebarProvider>
        <SideMenu history={history} />
      </ProSidebarProvider>
    );
  }
};

export default Eui;
