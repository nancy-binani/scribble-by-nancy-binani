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

import NavBar from "./components/Common";
import Dashboard from "./components/Dashboard";
import Create from "./components/Dashboard/Articles/Article/Create";
import Edit from "./components/Dashboard/Articles/Article/Edit";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/Eui";

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
      <Route exact component={NavBar} path={["/", "/articles/", "/settings"]} />
      <Switch history={history}>
        <Route component={Edit} path="/articles/:id/edit" />
        <Route component={Create} path="/articles/new_article" />
        <Route path="/settings" render={props => <Settings {...props} />} />
        <Route path="/public/*" render={props => <Eui {...props} />} />
        <Route exact component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
