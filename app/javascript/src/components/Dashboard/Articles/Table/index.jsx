import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildArticlesColumnData } from "./utils";

const Table = ({ articles, history, handleDelete, columns }) => (
  <NeetoUITable
    allowRowClick
    pagination
    columnData={buildArticlesColumnData(history, handleDelete, columns)}
    rowData={articles}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);

export default Table;
