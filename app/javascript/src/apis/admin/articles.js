import axios from "axios";

const fetch = params => axios.get("/api/admin/articles", { params });

const create = payload =>
  axios.post("/api/admin/articles", { article: payload });

const update = (payload, id) =>
  axios.put(`/api/admin/articles/${id}`, {
    article: payload,
  });

const updateWithPosition = async (position, id) =>
  await axios.put("/api/admin/articles/update_with_position", {
    position,
    id,
  });

const moveToCategory = async params =>
  await axios.put("/api/admin/articles/move_to_category", params);

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const count = () => axios.get("/api/admin/articles/count");

const versions = id => axios.get(`/api/admin/articles/${id}/versions`);

const updateVisits = ({ id, payload }) =>
  axios.put(`/api/admin/articles/${id}/update_visits_count`, {
    article: payload,
  });

const listUpdateSchedules = id =>
  axios.get(`/api/admin/articles/${id}/list_schedules`);

const createUpdateSchedule = ({ id, payload }) =>
  axios.post(`/api/admin/articles/${id}/create_schedule`, payload);

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  count,
  updateWithPosition,
  moveToCategory,
  versions,
  updateVisits,
  listUpdateSchedules,
  createUpdateSchedule,
};

export default articlesApi;
