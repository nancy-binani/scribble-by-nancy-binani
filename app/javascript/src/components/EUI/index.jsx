import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { ProSidebarProvider } from "react-pro-sidebar";

import { getFromLocalStorage } from "utils/storage";

import Login from "./Login";
import SideMenu from "./SideMenu";

const Eui = ({ history }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return !isLoggedIn ? (
    <Login history={history} />
  ) : (
    <ProSidebarProvider>
      <SideMenu history={history} />
    </ProSidebarProvider>
  );
};

export default Eui;
