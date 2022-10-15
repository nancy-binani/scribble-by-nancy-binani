import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { ProSidebarProvider } from "react-pro-sidebar";

import categoriesApi from "apis/categories";

import Authenticate from "./Authenticate";
import SideMenu from "./SideMenu";

const Eui = ({ status }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    <PageLoader />;
  }
  {
    return status ? (
      <Authenticate />
    ) : (
      <ProSidebarProvider>
        <SideMenu categories={categories} />
      </ProSidebarProvider>
    );
  }
};

export default Eui;
