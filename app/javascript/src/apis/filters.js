import axios from "axios";

const fetch = () => axios.get("/filters");

const update = (payload, id) => {
  axios.put(`/filters/${id}`, {
    filter: payload,
  });
};

const filterApi = { fetch, update };

export default filterApi;
