import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Button, Dropdown, Checkbox } from "@bigbinary/neetoui";
import { Container, Header } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";

import DeleteAlert from "./DeleteAlert";
import SideMenu from "./SideMenu";
import Table from "./Table";

import categoriesApi from "../../../apis/categories";

const { Menu, MenuItem } = Dropdown;

const Articles = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [slugToBeDeleted, setSlugToBeDeleted] = useState("");
  const [title, setTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const filteringOptions = ["Title", "Categories", "Date", "Author", "Status"];

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
      fetchCategories();
    }
  };
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
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

  const handleDelete = (slugToBeDeleted, title) => {
    setSlugToBeDeleted(slugToBeDeleted);
    setShowDeleteAlert(true);
    setTitle(title);
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

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen w-full">
      <SideMenu />
      <Container>
        <Header
          actionBlock={
            <>
              <Dropdown buttonStyle="secondary" label="Columns">
                <Menu>
                  {filteringOptions.map((item, idx) => (
                    <MenuItem.Button
                      key={idx}
                      prefix={<Checkbox checked id={idx} />}
                    >
                      {item}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
              <Button
                icon={Plus}
                label="Add New Article"
                onClick={() => history.push("/articles/create")}
              />
            </>
          }
          searchProps={{
            value: searchTerm,
            placeholder: "Search article title",
            onChange: e => setSearchTerm(e.target.value),
            onKeyDown: e => handleSearch(e),
          }}
        />
        <h4 className="mb-3 ml-3">{articles.length} Articles</h4>
        {filtering ? (
          <Table
            categories={categories}
            data={filteredList}
            handleDelete={handleDelete}
            history={history}
            searchTerm={searchTerm}
          />
        ) : (
          <Table
            categories={categories}
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
