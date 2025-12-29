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

export const getTopics = () => {
  return api.get("/api/topics");
}

export const getStaff = () => {
  return api.get("/api/staff");
}

export const getServiceTopic = () => {
  return api.get("/api/serviceTopic");
}

export const getAllStaff = () => {
  return api.get("/api/allstaff");
}

export const getProfile = (params) => {
  return api.get("/api/profile", { params });
}

export const getLogin = (data) => {
  return api.post("/api/login", data);
}

// dashboard APIs
export const addTopics = (data) => {
  return api.post("/api/addtopics", data);
}

export const removeTopics = (data) => {
  return api.delete("/api/removeTopics", { data });
}

export const updateTopics = (data) => {
  return api.put("/api/updateTopics", data);
}