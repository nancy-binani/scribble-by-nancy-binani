import React from "react";

import ManageCategories from "./ManageCategories";
import SideMenu from "./SideMenu";

const Settings = () => (
  //console.log("abc");
  <div className="flex h-screen w-full">
    <SideMenu />
    {/* <General /> */}
    <ManageCategories />
    {/* <Redirections /> */}
  </div>
);
export default Settings;
