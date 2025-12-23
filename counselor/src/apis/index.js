import api from "@/axios";

export const getTest = () => {
  return api.get("/api/test");
}

export const getNews = (params) => {
  return api.get("/api/news", { params });
}

export const getService = () => {
  return api.get("/api/service");
}