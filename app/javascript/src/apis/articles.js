import axios from "axios";

const fetch = () => axios.get("/articles");
const create = payload => axios.post("/articles", { article: payload });

const update = (payload, slug) => {
  axios.put(`/articles/${slug}`, {
    article: payload,
  });
};

const articlesApi = { fetch, create, update };

export default articlesApi;
