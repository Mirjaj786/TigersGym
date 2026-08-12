import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Axios instance with dynamic base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ─── 0. Auth / Admin API ─── */
export const adminLogin = async (credentials) => {
  const response = await api.post("/user/login", credentials);
  return response.data;
};

export const getAdminMe = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const adminLogout = async () => {
  const response = await api.get("/user/logout");
  return response.data;
};

/* ─── 1. Gallery API ─── */
export const getGalleryPhotos = async () => {
  const response = await api.get("/gallery");
  return response.data;
};

export const uploadGalleryPhoto = async (formData) => {
  const response = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteGalleryPhoto = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

/* ─── 2. Champions API ─── */
export const getChampions = async () => {
  const response = await api.get("/champion");
  return response.data;
};

export const uploadChampion = async (formData) => {
  const response = await api.post("/champion", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteChampion = async (id) => {
  const response = await api.delete(`/champion/${id}`);
  return response.data;
};

/* ─── 3. Gym Records API ─── */
export const getRecords = async () => {
  const response = await api.get("/record");
  return response.data;
};

export const uploadRecord = async (formData) => {
  const response = await api.post("/record", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteRecord = async (id) => {
  const response = await api.delete(`/record/${id}`);
  return response.data;
};

/* ─── 4. Contact Inquiries API ─── */
export const submitContactForm = async (data) => {
  const response = await api.post("/contact/submit", data);
  return response.data;
};

export const getContactInquiries = async () => {
  const response = await api.get("/contact");
  return response.data;
};

export const replyContactInquiry = async (id, replyText) => {
  const response = await api.post(`/contact/${id}/reply`, { replyText });
  return response.data;
};

export const deleteContactInquiry = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

export default api;
