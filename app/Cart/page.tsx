// app/cart/page.tsx
"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // Use cartItems instead of cart
  const router = useRouter();

  // Calculate total price by multiplying price * quantity for each item
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-black">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link href="/products" className="text-teal-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items Section */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white rounded-lg shadow-lg p-6">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                  <p className="text-gray-600">Rs. {item.price}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {/* Quantity Controls */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200  py-1 px-3 rounded hover:bg-gray-300 text-black"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200  py-1 px-3 rounded hover:bg-gray-300 text-black"
                    >
                      +
                    </button>
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. 250</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs. {(total+250).toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push('/Payment')}
                className="block w-full bg-teal-500 text-white py-2 px-4 rounded-lg text-center hover:bg-teal-600 mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
