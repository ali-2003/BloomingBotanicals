"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

interface PaymentFormState {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  transactionId: string;
}

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormState>({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    transactionId: '',
  });

  const [showDialog, setShowDialog] = useState<{ success: boolean; message: string } | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cartDetailsHTML = `
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: #4CAF50; color: white;">
            <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map(item => `
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">Rs. ${item.price * item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      address: formData.address,
      transactionId: formData.transactionId,
      cartItems: cartDetailsHTML,
      totalAmount: totalAmount,
    };

    emailjs.send('service_9hoacai', 'template_kxaxitx', templateParams, 'lDwAV3uAut8ihKZId')
      .then(() => {
        clearCart();
        setShowDialog({ success: true, message: 'Payment submitted successfully! Redirecting...' });
        setTimeout(() => {
          setShowDialog(null);
          router.push("/");
        }, 3000);
      }, (error) => {
        console.error('Error sending payment details:', error);
        setShowDialog({ success: false, message: 'Payment failed. Please try again!' });
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Complete Your Payment</h2>

        <div className="mb-6 text-sm text-gray-700 bg-indigo-50 p-4 rounded-lg shadow-inner">
          <p className="mb-2">Please transfer the total amount to the bank account below. Write your transaction ID in the form.</p>
          <p className="font-bold">You will receive a confirmation email once we verify the payment.</p>
          <p>For any queries, contact us at <strong>bloomingbotanicals2@gmail.com</strong>.</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-teal-600">Bank Details:</h3>
          <ul className="text-gray-800 space-y-2">
            <li><strong>Bank Name:</strong> Meezan Bank</li>
            <li><strong>Recipient Name:</strong> GHUFRANA ZAKARIA/MUNEEBA BADAR
</li>
            <li><strong>Account Number:</strong> 01050110517736
</li>
            <li><strong>IBAN Number:</strong> PK60MEZN0001050110517736</li>
          </ul>
        </div>

        <div className="border-b pb-4 mb-4 bg-teal-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-teal-700">Order Summary</h3>
          <ul className="text-gray-700 space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-1">
                <span>{item.name} x {item.quantity}</span>
                <span className="text-teal-700 font-bold">Rs. {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
            <strong>Total Amount:</strong>
            <strong className="text-teal-800">Rs. {totalAmount}</strong>
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              value={formData.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              value={formData.transactionId}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white py-2 px-4 rounded-md shadow-lg hover:from-teal-500 hover:to-indigo-600 transition duration-300 mt-6">
            Submit Payment
          </button>
        </form>

        {showDialog && (
          <div
            className={`fixed bottom-[50%] left-0 right-0 mx-auto w-full max-w-md p-4 text-center rounded-lg shadow-lg transition-opacity ${
              showDialog.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {showDialog.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
