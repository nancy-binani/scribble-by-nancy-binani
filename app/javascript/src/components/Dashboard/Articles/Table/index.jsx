import React, { useState, useEffect } from "react";

import { Table as NeetoUITable, Pagination, PageLoader } from "neetoui";

import articlesApi from "apis/admin/articles";

import { buildArticlesColumnData } from "./utils";

const Table = ({ history, handleDelete, columns }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles, count },
      } = await articlesApi.fetch({ page: currentPageNumber });
      setArticles(articles);
      setCount(count);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPageNumber]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <NeetoUITable
        allowRowClick
        columnData={buildArticlesColumnData(history, handleDelete, columns)}
        rowData={articles}
        onRowClick={() => {}}
        onRowSelect={() => {}}
      />
      <div className="m-5 flex w-full flex-row justify-end">
        <Pagination
          count={count}
          navigate={pageNumber => setCurrentPageNumber(pageNumber)}
          pageNo={currentPageNumber}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default Table;
