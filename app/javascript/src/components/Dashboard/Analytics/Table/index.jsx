import React from "react";

import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";

import { buildArticlesColumnData } from "./utils";

const Table = ({ articles }) => {
  const history = useHistory();

  return (
    <NeetoUITable
      allowRowClick
      pagination
      columnData={buildArticlesColumnData(history)}
      rowData={articles}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  );
};

export default Table;
