import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildArticlesColumnData } from "./utils";

const Table = ({ data, history, handleDelete, columns }) => (
  <NeetoUITable
    allowRowClick
    pagination
    columnData={buildArticlesColumnData(history, handleDelete, columns)}
    rowData={data}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);

export default Table;
