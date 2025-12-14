import React, { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";
import { getSweets, searchSweets } from "../api/sweets";

const SweetList = () => {
  const [sweets, setSweets] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const loadSweets = async () => {
    const res = await getSweets();
    setSweets(res.sweets);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleSearch = async () => {
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );

    const res = await searchSweets(params);
    setSweets(res.sweets);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🍭 Available Sweets
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            placeholder="Search name"
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />
          <input
            placeholder="Category"
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          />
          <input
            placeholder="Min Price"
            type="number"
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            placeholder="Max Price"
            type="number"
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>

      {/* Sweet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {sweets.map((sweet) => (
          <SweetCard key={sweet._id} sweet={sweet} />
        ))}
      </div>
    </div>
  );
};

export default SweetList;
