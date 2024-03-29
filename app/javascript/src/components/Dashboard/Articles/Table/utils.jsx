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
      render: (title, { category, slug }) => (
        <span
          onClick={() =>
            slug
              ? history.push(`/public/${category.category}/${slug}`)
              : alert("You can only see published articles!!")
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
      render: (updated_at, { status }) => (
        <div>
          {status === "draft" ? (
            <span>-----</span>
          ) : (
            <span>{formatDateAndTime(updated_at)}</span>
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
      render: author => author.name,
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
      title: "STATUS",
      dataIndex: "status",
      key: "Status",
      width: "15%",
      className: "text-gray-600",
      render: (updated_at, { status }) => (
        <div>
          {status === "draft" ? <span>Draft</span> : <span>Published</span>}
        </div>
      ),
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
                pathname: `/articles/${props.id}/edit`,
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
