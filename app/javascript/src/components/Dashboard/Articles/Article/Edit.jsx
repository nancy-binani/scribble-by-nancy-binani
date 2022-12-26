import React, { useState } from "react";

import articlesApi from "apis/admin/articles";

import Form from "./Form";
import NewScheduleUpdateForm from "./ScheduleForm";
import ScheduledUpdates from "./ScheduleUpdates";
import VersionHistory from "./VersionHistory";

import Navbar from "../../../Navbar";

const Edit = ({ history }) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [time, setTime] = useState("");
  const article = history.location.state.article;

  const handleScheduleUpdateSubmit = async ({
    dateAndTime,
    scheduleUpdateState,
  }) => {
    if (scheduleUpdateState === "Publish Later") {
      try {
        await articlesApi.update(
          {
            ...article,
            scheduled_publish: dateAndTime,
          },
          article.id
        );
        setIsPaneOpen(false);
      } catch (err) {
        logger.error(err);
      }
    }

    if (scheduleUpdateState === "Unpublish Later") {
      try {
        await articlesApi.update(
          {
            ...article,
            scheduled_unpublish: dateAndTime,
          },
          article.id
        );
        setIsPaneOpen(false);
      } catch (err) {
        logger.error(err);
      }
    }
  };

  const buildMenuItems = () => {
    const menuItems = [];
    if (
      article.status === "published" &&
      article?.scheduled_unpublish === null
    ) {
      menuItems.push("Unpublish Later");
    } else if (
      article.status === "draft" &&
      article?.scheduled_publish === null
    ) {
      menuItems.push("Publish Later");
    } else if (
      article.status === "draft" &&
      article?.scheduled_publish !== null &&
      article?.scheduled_unpublish === null
    ) {
      menuItems.push("Unpublish Later");
    } else if (
      article.status === "published" &&
      article?.scheduled_unpublish !== null &&
      article?.scheduled_publish === null
    ) {
      menuItems.push("Publish Later");
    }

    return menuItems;
  };

  return (
    <>
      <Navbar showTag status={article.status} />
      <ScheduledUpdates article={article} />
      <div className="flex">
        <Form
          isEdit
          article={article}
          history={history}
          setIsPaneOpen={setIsPaneOpen}
        />
        <VersionHistory article={article} history={history} />
      </div>
      <NewScheduleUpdateForm
        article={article}
        buildMenuItems={buildMenuItems}
        handleScheduleUpdateSubmit={handleScheduleUpdateSubmit}
        isPaneOpen={isPaneOpen}
        setIsPaneOpen={setIsPaneOpen}
        setTime={setTime}
        time={time}
      />
    </>
  );
};

export default Edit;
