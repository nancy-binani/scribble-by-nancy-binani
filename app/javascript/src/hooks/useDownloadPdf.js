import { useMutation } from "react-query";

import articlesApi from "apis/public/articles";

const download = async () => await articlesApi.download();

const useDownloadPdf = ({ onSuccess, onError }) =>
  useMutation({ mutationFn: download, onSuccess, onError });

export default useDownloadPdf;
