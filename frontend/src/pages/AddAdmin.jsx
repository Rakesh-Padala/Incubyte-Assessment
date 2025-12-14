import React, { useState } from "react";
import admin from "../assets/admin.avif";
import { registerAdmin } from "../api/auth";

const AddAdmin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerAdmin({
        name: userName,
        email,
        password,
      });

      alert("Admin registered successfully ✅");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 mt-10">
      <img className="w-1/3" src={admin} />

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-slate-700">
          Admin Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="shadow-xl mt-5 p-6 w-96 flex flex-col gap-4 rounded-lg"
        >
          {error && <p className="text-red-500">{error}</p>}

          <input
            className="p-2 border rounded"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className="p-2 border rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-2 border rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
