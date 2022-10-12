import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Redirections = () => (
  <>
    <div className="mx-auto my-6">
      <Typography style="h2">Redirections</Typography>
      <Typography className="text-gray-600" style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
    </div>
    <div className="absolute left-auto flex h-64 w-full  flex-col items-start gap-8 rounded-sm p-6">
      <div />
    </div>
  </>
);

export default Redirections;
