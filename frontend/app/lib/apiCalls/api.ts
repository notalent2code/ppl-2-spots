import axios from "axios";

// default api config
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

// tokenized api config
export const apiSecured = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { "Content-type": "application/json; charset=UTF-8" },
  withCredentials: true,
});
