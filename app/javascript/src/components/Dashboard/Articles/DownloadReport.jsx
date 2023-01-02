import React, { useEffect, useState } from "react";

import FileSaver from "file-saver";
import { Button } from "neetoui";

import articlesApi from "apis/public/articles";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/ProgressBar";

const DownloadReport = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await articlesApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await articlesApi.download();
      FileSaver.saveAs(data, "scribble_articles_report.pdf");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
      <h1>{message}</h1>
      <ProgressBar progress={progress} />
      <Button onClick={downloadPdf}>Download</Button>
    </div>
  );
};

export default DownloadReport;
