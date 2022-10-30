import React, { useEffect, useState } from "react";

import { PageLoader, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import articleApi from "apis/articles";

import { FILTERING_OPTIONS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [columns, setColumns] = useState(FILTERING_OPTIONS);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articleApi.fetch();
      setArticles(articles);
      setLoading(false);
      setFilteredList(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const destroyArticle = async id => {
    try {
      await articleApi.destroy(id);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSearch = e => {
    if (e.key === "Enter") {
      setFiltering(true);
      const query = searchTerm;
      let updatedList = [...articles];
      updatedList = articles.filter(
        ({ title }) => title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      searchTerm === ""
        ? setFilteredList(articles)
        : setFilteredList(updatedList);
    }
  };

  const handleDelete = (id, title) => {
    setId(id);
    setShowDeleteAlert(true);
    setTitle(title);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-full">
      <SideMenu
        fetchArticles={fetchArticles}
        filteredList={filteredList}
        filtering={filtering}
        setFilteredList={setFilteredList}
        setFiltering={setFiltering}
      />
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
        {filtering ? (
          <Table
            columns={columns}
            data={filteredList}
            handleDelete={handleDelete}
            history={history}
            searchTerm={searchTerm}
          />
        ) : (
          <Table
            columns={columns}
            data={articles}
            handleDelete={handleDelete}
            history={history}
            searchTerm={searchTerm}
          />
        )}
        {showDeleteAlert && articles.length > 1 && (
          <DeleteAlert
            destroyArticle={destroyArticle}
            id={id}
            title={title}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
