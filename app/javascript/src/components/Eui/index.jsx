import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { ProSidebarProvider } from "react-pro-sidebar";

import authApi from "apis/auth";
import { getFromLocalStorage } from "utils/storage";

import Login from "./Login";
import SideMenu from "./SideMenu";

const Eui = ({ history }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const [sitename, setSitename] = useState("");

  const fetchSiteDetails = async () => {
    try {
      const { data } = await authApi.fetch();
      setSitename(data.site.sitename);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchSiteDetails();
  }, []);

  return !isLoggedIn ? (
    <Login history={history} sitename={sitename} />
  ) : (
    <ProSidebarProvider>
      <SideMenu history={history} sitename={sitename} />
    </ProSidebarProvider>
  );
};

export default Eui;
