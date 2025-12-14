import React, { useState } from "react";
import PurchaseModal from "./PurchaseModal";
import { purchaseSweet } from "../api/sweets";

const SweetCard = ({ sweet }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = async (qty) => {
    try {
      await purchaseSweet(sweet._id, Number(qty));
      alert("Sweet purchased successfully 🍬");
      setShowModal(false);
      window.location.reload(); // simple refresh
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-purple-700">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500">{sweet.category}</p>

        <p className="mt-2 text-gray-700">
          ₹{sweet.price} · Stock: {sweet.quantity}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
        >
          Buy Now
        </button>
      </div>

      {showModal && (
        <PurchaseModal
          sweet={sweet}
          onClose={() => setShowModal(false)}
          onPurchase={handlePurchase}
        />
      )}
    </>
  );
};

export default SweetCard;
