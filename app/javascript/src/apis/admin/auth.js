import axios from "axios";

const fetch = () => axios.get("/api/admin/site");

const update = payload => {
  axios.put(`/api/admin/site`, {
    site: payload,
  });
};

const fetchUser = () => axios.get("/api/admin/users");

const login = payload =>
  axios.post("/api/admin/session", {
    login: payload,
  });

const authApi = {
  fetch,
  update,
  login,
  fetchUser,
};

export default authApi;
