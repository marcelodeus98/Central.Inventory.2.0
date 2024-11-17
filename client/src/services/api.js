import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.101.3:8077/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
