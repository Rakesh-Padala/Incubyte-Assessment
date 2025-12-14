import { useEffect, useState } from "react";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { getSweets, searchSweets, purchaseSweet } from "../api/sweets";

export default function Sweets() {
  useProtectedRoute();

  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");

  const loadSweets = async () => {
    const res = await getSweets();
    setSweets(res.data.sweets);
  };

  const search = async () => {
    const res = await searchSweets({ name });
    setSweets(res.data.sweets);
  };

  const buy = async (id) => {
    await purchaseSweet(id, 1);
    loadSweets();
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h2>Sweets</h2>

      <input placeholder="Search" onChange={(e) => setName(e.target.value)} />
      <button onClick={search}>Search</button>

      <ul>
        {sweets.map((s) => (
          <li key={s._id}>
            {s.name} - ₹{s.price} ({s.quantity})
            <button onClick={() => buy(s._id)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
