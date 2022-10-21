import axios from "axios";

const fetch = () => axios.get("/sites");

const update = payload => {
  axios.put(`/sites/2`, {
    site: payload,
  });
};

const updateStatus = payload => {
  axios.put(`/sites/2`, {
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
  updateStatus,
  login,
};

export default authApi;
