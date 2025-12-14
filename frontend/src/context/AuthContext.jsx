import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load auth state from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    return user;
  };

  // 🔹 REGISTER (Admin/User)
  const register = async (name, email, password, role = "user") => {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
      role,
    });

    return res.data;
  };

  // 🔹 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common["Authorization"];
  };

  // 🔹 ROLE CHECKS
  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook
export const useAuth = () => useContext(AuthContext);
