import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { ProSidebarProvider } from "react-pro-sidebar";

import Authenticate from "./Authenticate";
import SideMenu from "./SideMenu";

import { getFromLocalStorage } from "../../utils/storage";

const Eui = ({ status, history }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  {
    return status ? (
      <Authenticate isLoggedIn={isLoggedIn} />
    ) : (
      <ProSidebarProvider>
        <SideMenu history={history} />
      </ProSidebarProvider>
    );
  }
};

export default Eui;
