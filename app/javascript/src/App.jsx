import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import redirectionsApi from "apis/redirection";
import { initializeLogger } from "common/logger";
import PageLoader from "components/PageLoader";

import NavBar from "./components/Common";
import Dashboard from "./components/Dashboard";
import Create from "./components/Dashboard/Articles/Article/Create";
import Edit from "./components/Dashboard/Articles/Article/Edit";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/EUI";
import Authenticate from "./components/EUI/Authenticate";
import Detail from "./components/EUI/Detail";

const App = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [redirections, setRedirections] = useState([]);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchRedirections();
  }, []);

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

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
        <Route component={Edit} path="/articles/:slug/edit" />
        <Route component={Create} path="/articles/create" />
        <Route
          path="/settings"
          render={props => (
            <Settings {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route
          path="/public/*"
          render={props => (
            <Eui {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route component={Detail} path="/public/*" />
        <Route component={Dashboard} path="/" />
        <Route component={Authenticate} path="/login" />
      </Switch>
      {redirections.map(() => {
        <>
          <Redirect from="/settings" to="/settingsabc" />
          <Route exact from="/settings" />
        </>;
      })}
    </Router>
  );
};

export default App;
