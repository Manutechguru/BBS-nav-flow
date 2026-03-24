import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🔥 CHANGE THIS
  timeout: 10000,
});

// OPTIONAL (for auth later)
api.interceptors.request.use((config) => {
  // you can attach token later if needed
  return config;
});