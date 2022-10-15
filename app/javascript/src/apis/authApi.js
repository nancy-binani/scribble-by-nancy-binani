import axios from "axios";

const fetch = () => axios.get("/sites");

const update = payload => {
  axios.put(`/sites/1`, {
    site: payload,
  });
};

const authApi = {
  fetch,
  update,
};

export default authApi;
