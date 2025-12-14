import React, { useState } from "react";

const PurchaseModal = ({ sweet, onClose, onPurchase }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold text-purple-700">
          Buy {sweet.name}
        </h2>

        <p className="text-gray-600 mt-2">
          Available: {sweet.quantity}
        </p>

        <input
          type="number"
          min="1"
          className="mt-4 w-full border rounded-lg p-2 outline-purple-500"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onPurchase(qty)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
