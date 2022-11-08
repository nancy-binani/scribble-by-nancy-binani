import axios from "axios";

const fetch = params => axios.get("/api/articles", { params });
const create = payload => axios.post("/api/articles", { article: payload });

const update = (payload, id) => {
  axios.put(`/api/articles/${id}`, {
    article: payload,
  });
};

const destroy = id => axios.delete(`/api/articles/${id}`);

const count = () => axios.get("/api/articles/count");

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  count,
};

export default articlesApi;
