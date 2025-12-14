import API from "./axios";

export const registerAdmin = async ({ name, email, password }) => {
  const res = await API.post("/auth/register", {
    name,
    email,
    password,
    role: "admin",
  });
  return res.data;
};
export const registerUser = async ({ name, email, password }) => {
  const res = await API.post("/auth/register", {
    name,
    email,
    password,
    role: "user",
  });
  return res.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await API.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};
