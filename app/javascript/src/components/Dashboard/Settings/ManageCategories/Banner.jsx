import React from "react";

import { Typography } from "neetoui";

import { BANNER_DESCRIPTION } from "../constants";

const Banner = ({ setShowBanner }) => (
  <Typography className="mb-3 bg-indigo-100 p-2" style="body3">
    {BANNER_DESCRIPTION}
    <span className="underline" onClick={() => setShowBanner(false)}>
      {" "}
      Don't show this info again.
    </span>
  </Typography>
);

export default Banner;
