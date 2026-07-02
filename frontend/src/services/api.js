import axios from "axios";

const api = axios.create({
  baseURL:
    "https://supreme-space-computing-machine-q7r5xxxrwjrph9657-5000.app.github.dev/api",
});

export default api;