import axios from "axios";

const fetch = () => axios.get("/api/admin/redirections");

const create = payload =>
  axios.post("/api/admin/redirections", { redirection: payload });

const update = (payload, id) => {
  axios.put(`/api/admin/redirections/${id}`, {
    redirection: payload,
  });
};

const destroy = id => axios.delete(`/api/admin/redirections/${id}`);

const fetchRedirection = id => axios.get(`/api/admin/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy, fetchRedirection };

export default redirectionsApi;
