import { useState } from "react";

const SweetSearch = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  const reset = () => {
    setName("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onSearch({});
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
      <input
        placeholder="Search name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Price"
        className="border p-2 rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
        >
          Search
        </button>
        <button
          onClick={reset}
          className="flex-1 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SweetSearch;
