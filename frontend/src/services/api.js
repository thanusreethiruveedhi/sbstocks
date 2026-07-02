import axios from "axios";

const api = axios.create({
  baseURL: "https://sbstocks-backend.onrender.com/api",
});

export default api;