import React, { useEffect, useState } from "react";

import { PageLoader, Button, Dropdown } from "@bigbinary/neetoui";
import { Container, Header as NeetouiHeader } from "@bigbinary/neetoui/layouts";

import SideMenu from "./SideMenu";

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
        <NeetouiHeader
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
      </Container>
    </div>
  );
};

export default Articles;
