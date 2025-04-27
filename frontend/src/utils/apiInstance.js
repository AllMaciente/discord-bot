import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Corrigido de baseUrl para baseURL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default apiInstance;
