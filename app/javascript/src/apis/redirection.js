import axios from "axios";

const fetch = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", { redirection: payload });

const update = async (payload, id) => {
  axios.put(`/redirections/${id}`, {
    redirection: payload,
  });
  await fetch();
};
const destroy = id => axios.delete(`/redirections/${id}`);

const fetchRedirection = id => axios.get(`/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy, fetchRedirection };

export default redirectionsApi;
