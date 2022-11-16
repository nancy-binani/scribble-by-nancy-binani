import axios from "axios";

const fetch = params => axios.get("/api/admin/categories", { params });

const create = payload =>
  axios.post("/api/admin/categories", { category: payload });

const update = (payload, id) => {
  axios.put(`/api/admin/categories/${id}`, {
    category: payload,
  });
};

const updateWithPosition = async (position, id) => {
  await axios.put(`/api/admin/categories/update_with_position`, {
    position,
    id,
  });
};

const destroy = (id, params) =>
  axios.delete(`/api/admin/categories/${id}`, { params });

const categoriesApi = {
  fetch,
  create,
  update,
  updateWithPosition,
  destroy,
};

export default categoriesApi;
