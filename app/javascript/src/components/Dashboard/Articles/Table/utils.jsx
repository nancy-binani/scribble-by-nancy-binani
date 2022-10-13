import React from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";

import { formatDateAndTime } from "../utils";

export const buildArticlesColumnData = (history, handleDelete, categories) => [
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
    dataIndex: "category_id",
    key: "category_id",
    width: "15%",
    className: "text-gray-600",
    render: category_id =>
      categories[category_id] === undefined
        ? "Scribble"
        : categories[category_id]["category"],
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
    width: "15%",
    className: "text-gray-600",
    render: ({ ...props }) => (
      <span className="flex flex-row gap-2 ">
        <Delete
          size={20}
          onClick={() => {
            handleDelete(props.slug, props.title);
          }}
        />
        <Edit
          size={20}
          onClick={() =>
            history.push({
              pathname: `/articles/${props.slug}/edit`,
              state: { article: props },
            })
          }
        />
      </span>
    ),
  },
];
