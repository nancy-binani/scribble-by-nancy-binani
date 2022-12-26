import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";

import articlesApi from "apis/admin/articles";

import Modal from "./Modal";
import Versions from "./Versions";

import { formatDateAndTimeForToolTip } from "../utils";

const VersionHistory = ({ article, history }) => {
  const [showModal, setShowModal] = useState(false);
  const [version, setVersion] = useState({});
  const [versions, setVersions] = useState(null);
  const fetchVersions = async () => {
    try {
      const {
        data: { article_versions },
      } = await articlesApi.versions(article.id);
      const versionsOnUpdate = article_versions.slice(1);
      versionsOnUpdate?.(
        setVersions(
          versionsOnUpdate.reverse().map(version => ({
            id: version.id,
            article: version.object,
            category: version.category,
          }))
        )
      );
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="border-l h-screen w-1/4 overflow-y-auto">
      <div className="sticky top-0 z-40 ml-4 mt-8 bg-white">
        <Typography style="h3">Version History</Typography>
        <Typography className="mt-1 mb-4 text-gray-600" style="body1">
          Version history of {article.title} in Scribble.
        </Typography>
        <div className="border mr-4 mb-2 flex justify-between rounded-md bg-indigo-100 p-4">
          <div className="mr-4">
            <Typography className="text-gray-500" style="body2">
              {formatDateAndTimeForToolTip(article.updated_at)}
            </Typography>
            <Typography className="text-gray-500" style="body2">
              Current Version <br />
              {article.restored &&
                `Restored from (${formatDateAndTimeForToolTip(
                  article.restored_at
                )})`}
            </Typography>
          </div>
          <Typography className="my-auto text-indigo-500" style="h4">
            Article {article.status}
          </Typography>
        </div>
      </div>
      {versions && (
        <Versions
          articleVersions={versions}
          setShowModal={setShowModal}
          setVersion={setVersion}
        />
      )}
      {showModal && (
        <Modal
          article={article}
          history={history}
          setShowModal={setShowModal}
          showModal={showModal}
          version={version}
        />
      )}
    </div>
  );
};

export default VersionHistory;
