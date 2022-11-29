import React from "react";

import { Typography } from "neetoui";

const Banner = ({ setShowBanner }) => (
  <Typography className="mb-3 bg-indigo-100 p-2" style="body3">
    You can reorder categories or articles by drag and drop here. You can also
    multiselect articles and move them together to any category you have
    created.
    <span className="underline" onClick={() => setShowBanner(false)}>
      {" "}
      Don't show this info again.
    </span>
  </Typography>
);

export default Banner;
