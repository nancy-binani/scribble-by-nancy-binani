import { prop, evolve, always } from "ramda";

import { getFromLocalStorage } from "utils/storage";

export const subscribeToReportDownloadChannel = ({
  consumer,
  updateMessage,
  updatePercentage,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        updateMessage("Connected the Cables...");
        generatePdf();
      },
      received: data => {
        const message = prop(
          "message",
          evolve({ message: always("Report Download Progress") }, data)
        );
        updateMessage(message);
        const progress = prop(
          "progress",
          evolve({ progress: always(100) }, data)
        );
        updatePercentage(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
