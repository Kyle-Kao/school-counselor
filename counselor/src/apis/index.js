import api from "@/axios";

export const getTest = () => {
  return api.get("/api/test");
}