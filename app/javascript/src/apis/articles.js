import axios from "axios";

const fetch = () => axios.get("/api/articles");
const create = payload => axios.post("/api/articles", { article: payload });

const update = (payload, id) => {
  axios.put(`/api/articles/${id}`, {
    article: payload,
  });
};

const filterByCategory = params =>
  axios.get("/api/articles/filter_by_category", { params });

const filterStatus = params =>
  axios.get("/api/articles/filter_status", { params });

const destroy = id => axios.delete(`/api/articles/${id}`);

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  filterByCategory,
  filterStatus,
};

export default articlesApi;
