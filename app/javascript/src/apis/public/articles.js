import axios from "axios";

const show = id => axios.get(`/api/public/articles/${id}`);

const articlesApi = {
  show,
};

export default articlesApi;
