import dayjs from "dayjs";

export const defaultTime = { defaultValue: dayjs("00:00", "HH:mm") };

export const disabledDate = current =>
  current && current < dayjs().startOf("day");

export const formatDateToTimeDate = dateTime =>
  dayjs(dateTime).format("hh:mmA, DD/MM/YYYY");
