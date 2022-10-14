import React from "react";

import { Switch, Route } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";
import SideMenu from "./SideMenu";

const Settings = ({ history }) => (
  <div className="flex h-screen w-full">
    <SideMenu history={history} />
    <Switch>
      <Route exact component={General} path="/settings/" />
      <Route exact component={Redirections} path="/settings/redirections" />
      <Route
        exact
        component={ManageCategories}
        path="/settings/managecategories"
      />
    </Switch>
  </div>
);
export default Settings;
