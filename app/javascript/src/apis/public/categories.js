import axios from "axios";

const fetch = params => axios.get("/api/public/categories", { params });

const update = (payload, id) =>
  axios.put(`/api/public/categories/${id}`, {
    article: payload,
  });

const categoriesApi = {
  fetch,
  update,
};

export default categoriesApi;
