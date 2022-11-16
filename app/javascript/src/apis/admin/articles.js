import axios from "axios";

const fetch = params => axios.get("/api/admin/articles", { params });

const create = payload =>
  axios.post("/api/admin/articles", { article: payload });

const update = (payload, id) => {
  axios.put(`/api/admin/articles/${id}`, {
    article: payload,
  });
};

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const count = () => axios.get("/api/admin/articles/count");

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  count,
};

export default articlesApi;
