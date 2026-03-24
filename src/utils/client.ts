import { api } from "./api";

export const onboardClient = async (payload: any) => {
  const res = await api.post("/client/onboard", payload);
  return res.data;
};