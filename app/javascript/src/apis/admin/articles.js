import axios from "axios";

const fetch = params => axios.get("/api/admin/articles", { params });

const create = payload =>
  axios.post("/api/admin/articles", { article: payload });

const update = (payload, id) => {
  axios.put(`/api/admin/articles/${id}`, {
    article: payload,
  });
};

const updateWithPosition = async (position, id) => {
  await axios.put("/api/admin/articles/update_with_position", {
    position,
    id,
  });
};

const moveToCategory = async params => {
  await axios.put("/api/admin/articles/move_to_category", params);
};

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const count = () => axios.get("/api/admin/articles/count");

const versions = id => axios.get(`/api/admin/articles/${id}/versions`);

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  count,
  updateWithPosition,
  moveToCategory,
  versions,
};

export default articlesApi;
