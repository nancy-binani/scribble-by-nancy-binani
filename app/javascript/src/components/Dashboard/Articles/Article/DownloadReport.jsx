import React, { useEffect, useState } from "react";

import FileSaver from "file-saver";
import { Button } from "neetoui";
import { useProgress } from "stores";

import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import useDownloadPdf from "hooks/useDownloadPdf";
import useGeneratePdf from "hooks/useGeneratePdf";

import ProgressBar from "./ProgressBar";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { percentage, updatePercentage, message, updateMessage } =
    useProgress();

  const { mutate: generatePdf } = useGeneratePdf({
    onSuccess: () => null,
    onError: error => logger.error(error),
  });

  const { mutate: downloadPdf } = useDownloadPdf({
    onSuccess: data => {
      FileSaver.saveAs(data.data, "scribble_articles_report.pdf");
      setIsLoading(false);
    },
    onError: error => logger.error(error),
  });

  const consumer = createConsumer();

  const handleDownloadPdf = () => {
    setIsLoading(true);
    downloadPdf();
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      updateMessage,
      updatePercentage,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (percentage === 100) {
      setIsLoading(false);
      updateMessage("Report is ready to be downloaded");
    }
  }, [percentage]);

  return (
    <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
      <h1>{message}</h1>
      <ProgressBar progress={percentage} />
      <Button
        disabled={isLoading}
        label="Download"
        loading={isLoading}
        onClick={() => handleDownloadPdf()}
      />
    </div>
  );
};

export default DownloadReport;
