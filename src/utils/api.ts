import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

//  ATTACH TOKEN TO EVERY REQUEST
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);