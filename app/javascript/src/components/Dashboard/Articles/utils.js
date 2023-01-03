import dayjs from "dayjs";
import create from "zustand";

export const formatDateAndTime = date => dayjs(date).format("MMMM D, YYYY");
export const formatDateAndTimeForToolTip = date =>
  dayjs(date).format(" h:mm A, MM/DD/YYYY");

export const calculateCreatedAgo = date => dayjs(date).fromNow();

export const useProgress = create(set => ({
  percentage: 0,
  message: "",
  updatePercentage: percentage => set(() => ({ percentage })),
  updateMessage: message => set(() => ({ message })),
}));
