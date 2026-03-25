import { api } from "./api";

export const getDashboardClients = async () => {
  const res = await api.get("/admin/clients");
  return res.data.data;
};