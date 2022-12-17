import React from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";
import { useHistory } from "react-router-dom";

import { articleVisitsColumnData } from "./articleVisitsColumnData";
import { buildArticlesColumnData } from "./utils";

const Table = ({ articles }) => {
  const history = useHistory();

  return (
    <>
      <NeetoUITable
        pagination
        allowRowClick={false}
        columnData={buildArticlesColumnData(history)}
        rowData={articles}
        expandable={{
          expandedRowRender: article => (
            <div className="m-0 w-64">
              <NeetoUITable
                allowRowClick={false}
                columnData={articleVisitsColumnData}
                rowData={[article.dates_and_visits]}
                onRowClick={() => {}}
                onRowSelect={() => {}}
              />
            </div>
          ),
        }}
        onRowClick={() => {}}
        onRowSelect={() => {}}
      />
      <Pagination
        count={articles.count}
        navigate={() => {}}
        pageNo={1}
        pageSize={25}
      />
    </>
  );
};

export default Table;
