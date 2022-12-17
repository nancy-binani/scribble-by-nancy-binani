import React from "react";

export const articleVisitsColumnData = [
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
