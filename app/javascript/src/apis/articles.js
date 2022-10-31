import axios from "axios";

const fetch = () => axios.get("/articles");
const create = payload => axios.post("/articles", { article: payload });

const update = (payload, id) => {
  axios.put(`/articles/${id}`, {
    article: payload,
  });
};

const filterByCategory = params =>
  axios.get("/articles/filter_by_category", { params });

const filterStatus = params => axios.get("/articles/filter_status", { params });

const destroy = id => axios.delete(`/articles/${id}`);

const count = () => axios.get("/articles/count");

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  filterByCategory,
  filterStatus,
  count,
};

export default articlesApi;
