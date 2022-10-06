import axios from "axios";

const fetch = () => axios.get("/articles");
const create = payload => axios.post("/articles", { article: payload });

const update = (payload, slug) => {
  axios.put(`/articles/${slug}`, {
    article: payload,
  });
};

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = { fetch, create, update, destroy };

export default articlesApi;
