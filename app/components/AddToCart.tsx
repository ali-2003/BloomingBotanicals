// components/AddToCart.tsx
"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

interface AddToCartProps {
  productSlug: { current: string }; // Slug is passed as an object
  productName: string;
  productPrice: number;
  productImage: string;
}

const AddToCart = ({ productSlug, productName, productPrice, productImage }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false); // State for showing the message

  const handleAddToCart = () => {
    addToCart({
      id: productSlug.current, // This is the unique identifier
      name: productName,
      price: productPrice,
      quantity, // Ensure quantity is a number
      image: productImage,
    });

    // Show message and hide it after 3 seconds
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Quantity Controls */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          {/* - Button */}
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="py-2 px-4 bg-white border border-gray-300 rounded shadow hover:shadow-md transition-all ease-in-out duration-200 text-black"
          >
            -
          </button>
          <span className="text-black">{quantity}</span>
          {/* + Button */}
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="py-2 px-4 bg-white border border-gray-300 rounded shadow hover:shadow-md transition-all ease-in-out duration-200 text-black"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="py-2 px-6 bg-teal-500 text-white rounded shadow hover:bg-teal-600 hover:shadow-lg transition-all ease-in-out duration-200"
        >
          Add to Cart
        </button>
      </div>

      {/* Message Display */}
      {showMessage && (
        <div className="fixed bottom-10 right-10 lg:right-10 bg-teal-500 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out z-50">
          {quantity} {productName} added to cart
        </div>
      )}
    </div>
  );
};

export default AddToCart;
