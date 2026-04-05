import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
});

export default instance;
