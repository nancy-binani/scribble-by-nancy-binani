import axios from "axios";

const fetch = () => axios.get("/api/categories");

const create = payload => axios.post("/api/categories", { category: payload });
const update = (payload, id) => {
  axios.put(`/api/categories/${id}`, {
    category: payload,
  });
};
const updateWithPosition = async (position, id) => {
  await axios.put(`/api/categories/${id}/update_with_position`, {
    position,
    id,
  });
  await fetch();
};
const destroy = id => axios.delete(`/api/categories/${id}`);

const fetchCategory = id => axios.get(`/api/categories/${id}`);

const categoriesApi = {
  fetch,
  create,
  update,
  updateWithPosition,
  destroy,
  fetchCategory,
};

export default categoriesApi;
