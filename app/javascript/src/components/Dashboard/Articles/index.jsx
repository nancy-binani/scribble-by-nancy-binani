import React, { useEffect, useState } from "react";

import { PageLoader, Button, Dropdown } from "@bigbinary/neetoui";
import { Container, Header } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";

import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

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
              <Dropdown buttonStyle="secondary" label="Columns" />
              <Button
                label="Add New Article"
                onClick={() => history.push("/articles/create")}
              />
            </>
          }
          searchProps={{
            value: searchTerm,
            placeholder: "Search article title",
            onChange: e => setSearchTerm(e.target.value),
          }}
        />
        <h4 className="mb-3 ml-3">{articles.length} Articles</h4>
        <Table data={articles} />
      </Container>
    </div>
  );
};

export default Articles;
