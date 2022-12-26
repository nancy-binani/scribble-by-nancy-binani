import React, { useState } from "react";

import { DatePicker } from "antd";
import { Pane, Typography, Button } from "neetoui";

import { defaultTime, disabledDate } from "./utils";

const NewScheduleUpdateForm = ({
  isPaneOpen,
  setIsPaneOpen,
  handleScheduleUpdateSubmit,
  buildMenuItems,
}) => {
  const [dateAndTime, setDateAndTime] = useState("");
  const statusOption = buildMenuItems();

  return (
    <Pane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)}>
      <Pane.Header>
        <Typography style="h3">Schedule an Update</Typography>
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-6">
        <div className="w-full">
          <Typography>Date</Typography>
          <DatePicker
            className="w-full"
            disabledDate={disabledDate}
            format="DD-MM-YYYY HH:mm"
            placeholder="Select Date and Time"
            showTime={defaultTime}
            size="small"
            onChange={(e, str) => {
              setDateAndTime(str.concat(":00 +0530"));
            }}
          />
        </div>
        <div className="mt-2 flex space-x-2">
          <Button
            label={statusOption[0]}
            size="small"
            style="primary"
            onClick={() => {
              handleScheduleUpdateSubmit({
                scheduleUpdateState: statusOption[0],
                dateAndTime,
              });
            }}
          />
          <Button
            label="Cancel"
            size="small"
            style="text"
            onClick={() => setIsPaneOpen(false)}
          />
        </div>
        <Typography className="mt-2" style="body3">
          Note: A version of article will be created with the current status.
        </Typography>
      </Pane.Body>
    </Pane>
  );
};

export default NewScheduleUpdateForm;
