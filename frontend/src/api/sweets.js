import api from "./axios";

export const getSweets = () => api.get("/sweets");

export const searchSweets = (params) =>
  api.get("/sweets/search", { params });

export const purchaseSweet = (id, quantity) =>
  api.post(`/sweets/${id}/purchase`, { quantity });
