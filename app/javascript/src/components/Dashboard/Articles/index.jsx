import React, { useEffect, useState } from "react";

import { PageLoader, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import articleApi from "apis/admin/articles";

import { FILTERING_OPTIONS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteArticleId, setDeleteArticleId] = useState(null);
  const [title, setTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [articles, setArticles] = useState([]);
  const [columns, setColumns] = useState(FILTERING_OPTIONS);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articleApi.fetch();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const destroyArticle = async deleteArticleId => {
    try {
      await articleApi.destroy(deleteArticleId);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSearch = async searchTerm => {
    try {
      const {
        data: { articles },
      } = await articleApi.fetch({ title: searchTerm });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = (deleteArticleId, title) => {
    setDeleteArticleId(deleteArticleId);
    setShowDeleteAlert(true);
    setTitle(title);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-full">
      <SideMenu fetchArticles={fetchArticles} setArticles={setArticles} />
      <Container>
        <Header
          columns={columns}
          handleSearch={handleSearch}
          history={history}
          searchTerm={searchTerm}
          setColumns={setColumns}
          setSearchTerm={setSearchTerm}
        />
        <Typography className="mb-3 ml-3">
          {articles.length} Articles
        </Typography>
        <Table
          articles={articles}
          columns={columns}
          handleDelete={handleDelete}
          history={history}
        />
        {showDeleteAlert && (
          <DeleteAlert
            deleteArticleId={deleteArticleId}
            destroyArticle={destroyArticle}
            title={title}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
