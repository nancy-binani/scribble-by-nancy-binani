import axios from "axios";

const fetch = () => axios.get("/api/site");

const update = payload => {
  axios.put(`/site`, {
    site: payload,
  });
};

const fetchUser = () => axios.get("/api/users");

const login = (password, sitename) =>
  axios.post("/api/session", {
    login: { sitename, password },
  });

const authApi = {
  fetch,
  update,
  login,
  fetchUser,
};

export default authApi;
