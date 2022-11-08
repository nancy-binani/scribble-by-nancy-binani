import axios from "axios";

const fetch = () => axios.get("/api/redirections");

const create = payload =>
  axios.post("/api/redirections", { redirection: payload });

const update = (payload, id) => {
  axios.put(`/api/redirections/${id}`, {
    redirection: payload,
  });
};
const destroy = id => axios.delete(`/api/redirections/${id}`);

const fetchRedirection = id => axios.get(`/api/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy, fetchRedirection };

export default redirectionsApi;
