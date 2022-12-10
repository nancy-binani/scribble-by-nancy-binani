import React from "react";

import { Pagination } from "antd";
import { Table as NeetoUITable } from "neetoui";

import { buildArticlesColumnData } from "./utils";

const Table = ({ articles }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={buildArticlesColumnData(history)}
      rowData={articles}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
    <br />
    <div className="flex justify-end">
      <Pagination
        showQuickJumper
        showSizeChanger
        total={articles.length}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  </>
);

export default Table;
