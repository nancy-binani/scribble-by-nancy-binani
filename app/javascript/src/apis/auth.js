import axios from "axios";

const fetch = () => axios.get("/api/site");

const update = payload => {
  axios.put(`/api/site`, {
    site: payload,
  });
};

const fetchUser = () => axios.get("/api/users");

const login = payload =>
  axios.post("/api/session", {
    login: payload,
  });

const authApi = {
  fetch,
  update,
  login,
  fetchUser,
};

export default authApi;
