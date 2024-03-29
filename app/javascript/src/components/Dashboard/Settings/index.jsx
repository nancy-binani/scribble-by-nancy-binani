import React from "react";

import { useLocation } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Menubar from "./Menubar";
import Redirections from "./Redirections";

const Settings = ({ history }) => {
  const location = useLocation();
  const menu = location.search.split("=")[1];
  const selectedSideMenu = location.search === "" ? "General" : menu;
  if (location.search === "") {
    history.push({
      pathname: "/settings",
      search: `?tab=General`,
    });
  }
  const showSelectedSettingsMenu = selectedComponent => {
    switch (selectedComponent) {
      case "Manage%20Categories":
        return <ManageCategories />;
      case "Redirections":
        return <Redirections />;
      default:
        return <General />;
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Menubar history={history} menu={menu} />
      {showSelectedSettingsMenu(selectedSideMenu)}
    </div>
  );
};
export default Settings;
