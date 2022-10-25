import axios from "axios";

const fetch = () => axios.get("/articles");
const create = payload => axios.post("/articles", { article: payload });

const update = (payload, slug) => {
  axios.put(`/articles/${slug}`, {
    article: payload,
  });
};
const filteredArticles = () => axios.get("/articles/filters");

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = { fetch, create, update, destroy, filteredArticles };

export default articlesApi;
