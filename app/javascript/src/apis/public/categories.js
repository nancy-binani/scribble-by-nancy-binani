import axios from "axios";

const fetch = params => axios.get("/api/public/categories", { params });

const categoriesApi = {
  fetch,
};

export default categoriesApi;
