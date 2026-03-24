import { api } from "./api";

export const getPlans = async () => {
  const res = await api.get("/plans");
  return res.data;
};