import axios from "axios";

const list = () => axios.get("/filters");

const update = (payload, id) => {
  axios.put(`/filters/${id}`, {
    filter: payload,
  });
};

const filterApi = { list, update };

export default filterApi;
