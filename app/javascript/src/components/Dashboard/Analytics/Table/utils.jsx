import React from "react";

import { formatDateAndTime } from "../../Articles/utils";

export const buildArticlesColumnData = history => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "Title",
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
    className: "text-gray-600",
    render: category => category["category"],
  },
  {
    title: "VISITS",
    dataIndex: "visits_count",
    key: "Visits",
    className: "text-gray-600",
    render: visits_count => <span>{visits_count}</span>,
    sorter: (a, b) => a.visits_count - b.visits_count,
  },
];
