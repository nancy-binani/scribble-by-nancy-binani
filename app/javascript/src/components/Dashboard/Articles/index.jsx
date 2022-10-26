import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Container } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";

import { FILTERING_OPTIONS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [slugToBeDeleted, setSlugToBeDeleted] = useState("");
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
      } = await articlesApi.fetch();
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const destroyArticle = async slugToBeDeleted => {
    try {
      await articlesApi.destroy(slugToBeDeleted);
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

  const handleDelete = (slugToBeDeleted, title) => {
    setSlugToBeDeleted(slugToBeDeleted);
    setShowDeleteAlert(true);
    setTitle(title);
  };

  const handleFilter = query => {
    setFiltering(true);
    let updatedList = [...articles];
    updatedList = articles.filter(
      article =>
        article["status"].toLowerCase() === query.toLowerCase() ||
        article["assigned_category"]["category"].toLowerCase() ===
          query.toLowerCase()
    );
    query === "All" ? setFilteredList(articles) : setFilteredList(updatedList);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-full">
      <SideMenu handleFilter={handleFilter} />
      <Container>
        <Header
          columns={columns}
          handleSearch={handleSearch}
          history={history}
          searchTerm={searchTerm}
          setColumns={setColumns}
          setSearchTerm={setSearchTerm}
        />
        <h4 className="mb-3 ml-3">{articles.length} Articles</h4>
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
            slug={slugToBeDeleted}
            title={title}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
