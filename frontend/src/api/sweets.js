import axios from "axios";
export const createSweet = async (sweetData) => {
  const res = await axios.post("/sweets", sweetData);
  return res.data;
};

export const getSweets = async () => {
  const res = await axios.get("/sweets");
  return res.data;
};

export const searchSweets = async (params) => {
  const res = await axios.get("/sweets/search", { params });
  return res.data;
};
export const purchaseSweet = async (sweetId, quantity) => {
  const res = await axios.post(`/sweets/${sweetId}/purchase`, {
    quantity,
  });
  return res.data;
};
