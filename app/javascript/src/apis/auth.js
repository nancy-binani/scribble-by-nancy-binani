import axios from "axios";

const fetch = () => axios.get("/site");

const update = payload => {
  axios.put(`/site`, {
    site: payload,
  });
};

const login = (password, sitename) =>
  axios.post("/session", {
    login: { sitename, password },
  });

const authApi = {
  fetch,
  update,
  login,
};

export default authApi;
