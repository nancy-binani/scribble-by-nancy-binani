import React from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import { Container } from "@bigbinary/neetoui/layouts";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const Detail = ({ title, category, created_at, body }) => (
  <Container className="mx-10">
    <Typography className="my-5" style="h1">
      {title}
    </Typography>
    {title && (
      <span className="my-3 flex">
        {" "}
        <Tag label={category} />{" "}
        <span className="mx-2 text-gray-600">
          {formatDateAndTime(created_at)}
        </span>
      </span>
    )}
    <p>{body}</p>
  </Container>
);

export default Detail;
