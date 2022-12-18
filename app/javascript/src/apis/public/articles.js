import axios from "axios";

const fetch = params => axios.get("/api/public/articles", { params });

const articlesApi = {
  fetch,
};

export default articlesApi;
