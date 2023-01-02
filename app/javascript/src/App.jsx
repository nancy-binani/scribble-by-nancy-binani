import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PageLoader from "components/PageLoader";
import "lib/dayjs";

import Dashboard from "./components/Dashboard";
import Analytics from "./components/Dashboard/Analytics";
import Create from "./components/Dashboard/Articles/Article/Create";
import Edit from "./components/Dashboard/Articles/Article/Edit";
import DownloadReport from "./components/Dashboard/Articles/DownloadReport";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/Eui";
import Navbar from "./components/Navbar";

const App = () => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Route
        exact
        component={Navbar}
        path={["/", "/settings", "/analytics"]}
        showTag={false}
      />
      <Switch history={history}>
        <Route component={Edit} path="/articles/:id/edit" />
        <Route component={Create} path="/articles/create" />
        <Route path="/settings" render={props => <Settings {...props} />} />
        <Route path="/public/*" render={props => <Eui {...props} />} />
        <Route exact component={Analytics} path="/analytics" />
        <Route exact component={DownloadReport} path="/report" />;
        <Route exact component={Dashboard} path={["/", "/articles"]} />
      </Switch>
    </Router>
  );
};

export default App;
