import React from "react";

import { formatDateAndTime } from "../../Articles/utils";

export const buildArticlesColumnData = history => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "Title",
    width: "15%",
    className: "text-indigo-500",
    render: (title, { category, slug }) => (
      <span
        onClick={() => {
          history.push(`/public/${category.category}/${slug}`);
        }}
      >
        {title}
      </span>
    ),
  },
  {
    title: "DATE",
    dataIndex: "created_at",
    key: "Date",
    width: "15%",
    render: (created_at, { status }) => (
      <div>
        {status === "draft" ? (
          <span>-----</span>
        ) : (
          <span>{formatDateAndTime(created_at)}</span>
        )}
      </div>
    ),
  },

  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: "15%",
    className: "text-gray-600",
    render: category => category["category"],
  },
  {
    title: "VISITS",
    dataIndex: "visits",
    key: "Visits",
    width: "15%",
    className: "text-gray-600",
    render: visits => <span>{visits}</span>,
    sorter: (a, b) => a.visits - b.visits,
  },
];
