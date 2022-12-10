import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";

import articlesApi from "apis/admin/articles";

import Table from "./Table/Table";

import { COLUMN_OPTIONS } from "../Articles/constants";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="ml-56 mr-56 mt-10">
      <Table articles={articles} columns={COLUMN_OPTIONS} />
    </div>
  );
};

export default Analytics;
