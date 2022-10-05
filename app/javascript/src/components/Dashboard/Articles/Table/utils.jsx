import React from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";

import { formatDateAndTime } from "../utils";

export const buildArticlesColumnData = () => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "20%",
    className: "text-indigo-500",
  },
  {
    title: "DATE",
    dataIndex: "created_at",
    key: "date",
    width: "15%",
    render: date => formatDateAndTime(date),
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
    width: "15%",
    className: "text-gray-600",
  },
  {
    title: "CATEGORY",
    dataIndex: "categories",
    key: "category",
    width: "15%",
    className: "text-gray-600",
    render: categories => categories.join(","),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: "15%",
    className: "text-gray-600",
  },
  {
    title: "",
    dataIndex: "option",
    key: "option",
    width: "15%",
    className: "text-gray-600",
    render: () => (
      <span className="flex flex-row gap-2 ">
        <Delete size={20} />
        <Edit size={20} />
      </span>
    ),
  },
];
