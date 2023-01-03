import { useMutation } from "react-query";

import articlesApi from "apis/public/articles";

const generatePdf = async () => await articlesApi.generatePdf();

const useGeneratePdf = ({ onSuccess, onError }) =>
  useMutation({ mutationFn: generatePdf, onSuccess, onError });

export default useGeneratePdf;
