import axios from "axios";

const fetch = params => axios.get("/api/public/articles", { params });

const update = (payload, id) => {
  axios.put(`/api/public/articles/${id}`, {
    article: payload,
  });
};

const articlesApi = {
  fetch,
  update,
};

export default articlesApi;
