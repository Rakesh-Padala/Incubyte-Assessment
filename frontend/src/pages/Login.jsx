import React, { useState } from "react";
import admin from "../assets/sup.jpg";
import axios from "../api/axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // frontend validation (matches backend requirements)
    if (!userName || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        name: userName,     // ✅ backend expects "name"
        email: email,
        password: password,
        role: "admin",      // ✅ backend requires role
      };

      const res = await axios.post("/auth/register", payload);

      if (res.data.success) {
        alert("Admin registered successfully");
        setUserName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 mt-7">
      <img className="w-1/3 h-auto" src={admin} alt="admin" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold text-slate-700">
          Admin Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="shadow-2xl flex flex-col justify-center mt-4 items-center border-2 rounded-lg w-96 gap-6 py-7"
        >
          <div className="flex flex-col justify-start items-center gap-4">
            <p className="mr-[185px]">Enter username</p>
            <input
              className="p-2 outline-none border-2 rounded-lg w-full"
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <p className="mr-[185px]">Enter password</p>
            <input
              className="p-2 outline-none border-2 rounded-lg w-full"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <p className="mr-[215px]">Enter email</p>
            <input
              className="p-2 outline-none border-2 rounded-lg w-[310px]"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="shadow-lg hover:bg-blue-800 w-[315px] h-9 bg-blue-500 rounded-full text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
