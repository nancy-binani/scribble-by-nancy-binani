import React from "react";

import { formatDateAndTime } from "../../Articles/utils";

export const buildArticlesColumnData = () => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "Title",
    className: "text-gray-600",
  },
  {
    title: "DATE",
    dataIndex: "created_at",
    key: "Date",
    className: "text-gray-600",
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

export const buildArticleVisitsColumnData = [
  {
    title: "DATE",
    key: "Date",
    width: "55%",
    render: ({ ...props }) => (
      <div>
        {Object.keys(props).map((key, idx) => (
          <div key={idx}>{key}</div>
        ))}
      </div>
    ),
  },
  {
    title: "VISITS",
    key: "Visits",
    render: ({ ...props }) => (
      <div>
        {Object.values(props).map((val, idx) => (
          <div key={idx}>{val}</div>
        ))}
      </div>
    ),
  },
];
