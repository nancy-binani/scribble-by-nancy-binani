import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { ProSidebarProvider } from "react-pro-sidebar";

import authApi from "apis/admin/auth";
import { getFromLocalStorage } from "utils/storage";

import Login from "./Login";
import SideMenu from "./SideMenu";

const Eui = ({ history }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const [name, setName] = useState("");

  const fetchSiteDetails = async () => {
    try {
      const { data } = await authApi.fetch();
      setName(data.site.name);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchSiteDetails();
  }, []);

  return !isLoggedIn ? (
    <Login history={history} name={name} />
  ) : (
    <ProSidebarProvider>
      <SideMenu history={history} name={name} />
    </ProSidebarProvider>
  );
};

export default Eui;
