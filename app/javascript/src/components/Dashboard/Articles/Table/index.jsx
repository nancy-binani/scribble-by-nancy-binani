import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import { buildArticlesColumnData } from "./utils";

const Table = ({ data, history, handleDelete, categories }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={buildArticlesColumnData(history, handleDelete, categories)}
      rowData={data}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
    <div className="mt-5 flex w-full flex-row justify-end">
      <Pagination count={50} navigate={() => {}} pageNo={1} pageSize={10} />
    </div>
  </>
);

export default Table;
