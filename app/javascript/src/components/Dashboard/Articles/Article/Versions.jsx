import React from "react";

import { Typography } from "neetoui";

import { formatDateAndTimeForToolTip } from "../utils";

const Versions = ({ articleVersions, setVersion, setShowModal }) =>
  articleVersions.map(version => (
    <div className="border mx-4 mb-2 rounded-md p-4" key={version.id}>
      <div className="flex justify-between">
        <div>
          <Typography className="mr-4 text-gray-500" style="body2">
            {formatDateAndTimeForToolTip(version.article.updated_at)}
          </Typography>
          {version.article.restored && (
            <Typography className="mr-4 text-gray-500" style="body2">
              Restored from (
              {formatDateAndTimeForToolTip(version.article.restored_at)})
            </Typography>
          )}
        </div>
        <Typography
          className="my-auto cursor-pointer text-indigo-500"
          style="h4"
          onClick={() => {
            setVersion(version);
            setShowModal(true);
          }}
        >
          Article&nbsp;
          {version.article.status}
        </Typography>
      </div>
    </div>
  ));

export default Versions;
