import React from "react";

import { Tag, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const Detail = ({ title, category, date, body }) => (
  <Container className="mx-10">
    <Typography className="my-5" style="h1">
      {title}
    </Typography>
    {title && (
      <span className="my-3 flex">
        {" "}
        <Tag label={category} />{" "}
        <span className="mx-2 text-gray-600">{formatDateAndTime(date)}</span>
      </span>
    )}
    <p>{body}</p>
  </Container>
);

export default Detail;
