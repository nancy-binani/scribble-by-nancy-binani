import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import sitesApi from "apis/admin/sites";

import { SIDENAV_LINKS } from "./constants";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const fetchSiteDetails = async () => {
    try {
      const { data } = await sitesApi.fetch();
      setName(data.site.name);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSiteDetails();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <NeetoUISidebar
      exact
      appName={name}
      navLinks={SIDENAV_LINKS}
      organizationInfo={{
        name: { name },
        subdomain: "scribble.com",
      }}
      profileInfo={{
        name: "Oliver Smith",
        imageUrl: "https://randomuser.me/api/portraits/women/90.jpg",
        email: "oliver@example.com",
      }}
    />
  );
};
export default Sidebar;
