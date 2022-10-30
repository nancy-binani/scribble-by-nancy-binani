import React from "react";

import { Delete, Edit } from "neetoicons";

import { formatDateAndTime } from "../utils";

export const buildArticlesColumnData = (history, handleDelete, columns) =>
  [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "Title",
      width: "20%",
      className: "text-indigo-500",
      render: (title, { assigned_category }) => (
        <span
          onClick={() =>
            history.push(`/public/${assigned_category.category}/${title}`)
          }
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
          {status === "Draft" ? (
            <span>-----</span>
          ) : (
            <span>{formatDateAndTime(created_at)}</span>
          )}
        </div>
      ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "Author",
      width: "15%",
      className: "text-gray-600",
    },
    {
      title: "CATEGORY",
      dataIndex: "assigned_category",
      key: "category",
      width: "15%",
      className: "text-gray-600",
      render: assigned_category => assigned_category["category"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "Status",
      width: "15%",
      className: "text-gray-600",
    },
    {
      title: "",
      width: "15%",
      key: "Options",
      className: "text-gray-600",
      render: ({ ...props }) => (
        <span className="flex flex-row gap-2 ">
          <Delete
            size={20}
            onClick={() => {
              handleDelete(props.id, props.title);
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
  ].filter(
    column =>
      column.key === "Options" ||
      column.key === "Title" ||
      columns.includes(column?.key) ||
      (columns.includes("Categories") && column.key === "category")
  );
