import dayjs from "dayjs";

export const formatDateAndTime = date => dayjs(date).format("MMMM D, YYYY");
export const formatDateAndTimeForToolTip = date =>
  dayjs(date).format(" h:mm A, MM/DD/YYYY");

export const calculateCreatedAgo = date => dayjs(date).fromNow();
