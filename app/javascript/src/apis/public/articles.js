import axios from "axios";

const fetch = params => axios.get("/api/public/articles", { params });

const generatePdf = () => axios.post("api/public/articles/report", {});

const download = () =>
  axios.get("/api/public/articles/report/download", { responseType: "blob" });

const articlesApi = {
  fetch,
  generatePdf,
  download,
};

export default articlesApi;
