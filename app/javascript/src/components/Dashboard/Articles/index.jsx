import React, { useEffect, useState } from "react";

import { PageLoader, Button, Dropdown } from "@bigbinary/neetoui";
import { Container, Header } from "@bigbinary/neetoui/layouts";

import SideMenu from "./SideMenu";
import Table from "./Table";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    setLoading(false);
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
              <Button label="Add New Article" />
            </>
          }
          searchProps={{
            value: searchTerm,
            placeholder: "Search article title",
            onChange: e => setSearchTerm(e.target.value),
          }}
        />
        <h4 className="mb-3 ml-3">67 Articles</h4>
        <Table />
      </Container>
    </div>
  );
};

export default Articles;
