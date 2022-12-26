import React, { useEffect, useState } from "react";

import { Callout, Alert } from "neetoui";

import articlesApi from "apis/admin/articles";

import { formatDateAndTimeForToolTip } from "../utils";

const ScheduledUpdates = ({ article }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [publishLater, setPublishLater] = useState(article.scheduled_publish);
  const [unpublishLater, setUnpublishLater] = useState(
    article.scheduled_unpublish
  );
  let alertMessage, scheduledPublish, scheduledUnpublish;
  const handleCancelScheduleCases = () => {
    if (
      article.status === "draft" &&
      article.scheduled_publish !== null &&
      article.scheduled_unpublish !== null
    ) {
      scheduledPublish = null;
      scheduledUnpublish = null;
      alertMessage = `Cancel publish schedule of ${formatDateAndTimeForToolTip(
        article.scheduled_publish
      )} ? This will also cancel unpublish schedule of  ${formatDateAndTimeForToolTip(
        article.scheduled_unpublish
      )}. Are you sure you want to continue?`;
    } else if (
      article.status === "published" &&
      article.scheduled_unpublish !== null &&
      article.scheduled_publish !== null
    ) {
      scheduledPublish = null;
      scheduledUnpublish = null;
      alertMessage = `Cancel unpublish schedule of ${formatDateAndTimeForToolTip(
        article.scheduled_unpublish
      )} ? This will also cancel publish schedule of  ${formatDateAndTimeForToolTip(
        article.scheduled_publish
      )}. Are you sure you want to continue?`;
    } else if (
      article.status === "draft" &&
      article.scheduled_publish !== null &&
      article.scheduled_unpublish === null
    ) {
      scheduledPublish = null;
      alertMessage = `Cancel publish schedule of ${formatDateAndTimeForToolTip(
        article.scheduled_publish
      )} ?`;
    } else if (
      article.status === "published" &&
      article.scheduled_unpublish !== null &&
      article.scheduled_publish === null
    ) {
      scheduledUnpublish = null;
      alertMessage = `Cancel unpublish schedule of ${formatDateAndTimeForToolTip(
        article.scheduled_unpublish
      )} ?`;
    }
    setMessage(alertMessage);
    setPublishLater(scheduledPublish);
    setUnpublishLater(scheduledUnpublish);
  };

  const handleCancelLaterSchedules = async () => {
    try {
      await articlesApi.update(
        {
          ...article,
          scheduled_publish: publishLater,
          scheduled_unpublish: unpublishLater,
        },
        article.id
      );
    } catch (err) {
      logger.error(err);
    }
    await articlesApi.fetch();
    setShowAlert(false);
  };

  useEffect(() => {
    handleCancelScheduleCases();
  }, [showAlert]);

  return (
    <div className="space-y-2 py-4 px-2">
      {article.scheduled_publish && (
        <Callout style="success">
          Article will be published at{" "}
          {formatDateAndTimeForToolTip(article.scheduled_publish)}
          <span
            className="cursor-pointer text-indigo-600 underline"
            onClick={() => {
              handleCancelScheduleCases();
              setShowAlert(true);
            }}
          >
            {" "}
            Click here to cancel schedule
          </span>
        </Callout>
      )}
      {article.scheduled_unpublish && (
        <Callout style="warning">
          Article will be draft at{" "}
          {formatDateAndTimeForToolTip(article.scheduled_unpublish)}
          <span
            className="cursor-pointer text-indigo-600 underline"
            onClick={() => {
              setShowAlert(true);
            }}
          >
            {" "}
            Click here to cancel schedule
          </span>
        </Callout>
      )}
      <Alert
        isOpen={showAlert}
        message={message}
        onClose={() => setShowAlert(false)}
        onSubmit={handleCancelLaterSchedules}
      />
    </div>
  );
};

export default ScheduledUpdates;
