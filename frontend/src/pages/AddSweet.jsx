import React, { useState } from "react";
import { createSweet } from "../api/sweets";

const AddSweet = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createSweet({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setMessage("🎉 Sweet added successfully!");
      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });
    } catch (err) {
      setMessage("❌ Failed to add sweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-[420px]"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Add New Sweet 🍬
        </h2>

        <input
          name="name"
          placeholder="Sweet Name"
          value={form.name}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="category"
          placeholder="Category (Indian / Western)"
          value={form.category}
          onChange={handleChange}
          className="input"
          required
        />

        <div className="flex gap-3">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="input h-20 resize-none"
        />

        <button
          disabled={loading}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Adding..." : "Add Sweet"}
        </button>

        {message && (
          <p className="text-center mt-4 font-medium text-slate-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddSweet;
