import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import sitesApi from "apis/admin/sites";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PageLoader from "components/PageLoader";
import "lib/dayjs";
import { setUserToLocalStorage } from "utils/storage";

import Dashboard from "./components/Dashboard";
import Analytics from "./components/Dashboard/Analytics";
import Create from "./components/Dashboard/Articles/Article/Create";
import DownloadReport from "./components/Dashboard/Articles/Article/DownloadReport";
import Edit from "./components/Dashboard/Articles/Article/Edit";
import Settings from "./components/Dashboard/Settings";
import Eui from "./components/Eui";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
const App = () => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const fetchSiteDetails = async () => {
    try {
      const { data } = await sitesApi.fetch();
      setUserToLocalStorage({ authUserId: data.site.users[0].id });
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchSiteDetails();
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
    <QueryClientProvider client={queryClient}>
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
          <Route exact component={DownloadReport} path="/report" />
          <Route exact component={Dashboard} path={["/", "/articles"]} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
