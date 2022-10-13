import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload => axios.post("/categories", { category: payload });
const update = (payload, id) => {
  axios.put(`/categories/${id}`, {
    category: payload,
  });
};
const destroy = id => axios.delete(`/categories/${id}`);

const fetchCategory = id => axios.get(`/categories/${id}`);

const categoriesApi = { fetch, create, update, destroy, fetchCategory };

export default categoriesApi;
