import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PageLoader from "components/PageLoader";

import NavBar from "./components/Common";
import Dashboard from "./components/Dashboard";
import Create from "./components/Dashboard/Articles/Article/Create";
import Edit from "./components/Dashboard/Articles/Article/Edit";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/EUI";
import Authenticate from "./components/EUI/Authenticate";

const App = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    initializeLogger();
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
      <NavBar history={history} />
      <Switch history={history}>
        <Route exact component={Edit} path="/articles/:slug/edit" />
        <Route exact component={Create} path="/articles/create" />
        <Route
          exact
          path="/settings/*"
          render={props => (
            <Settings {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route
          exact
          path="/eui"
          render={props => (
            <Eui {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route exact component={Dashboard} path="/" />
        <Route exact component={Authenticate} path="/login" />
      </Switch>
    </Router>
  );
};

export default App;
