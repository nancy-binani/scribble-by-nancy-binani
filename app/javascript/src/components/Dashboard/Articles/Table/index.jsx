import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import { buildContactsColumnData } from "./utils";

//import { ARTICLE_DETAILS } from "../constants";

const Table = ({ data }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={buildContactsColumnData()}
      rowData={data}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
    <div className="mt-5 flex w-full flex-row justify-end">
      <Pagination count={50} navigate={() => {}} pageNo={3} pageSize={10} />
    </div>
  </>
);

export default Table;
