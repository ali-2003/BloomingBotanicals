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

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [showDialog, setShowDialog] = useState<{ success: boolean; message: string } | null>(null);
  const [errorMessages, setErrorMessages] = useState<Partial<Record<keyof PaymentFormState, string>>>({});
  const form = useRef<HTMLFormElement>(null);
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const deliveryPrice = 250;
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryPrice;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message for the field being edited
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrorMessages: Partial<Record<keyof PaymentFormState, string>> = {};
    if (!formData.name) newErrorMessages.name = 'Name is required';
    if (!formData.email) newErrorMessages.email = 'Email is required';
    if (!formData.whatsapp) newErrorMessages.whatsapp = 'WhatsApp Number is required';
    if (!formData.address) newErrorMessages.address = 'Address is required';
    if (paymentMethod === 'online' && !formData.transactionId) {
      newErrorMessages.transactionId = 'Transaction ID is required for online payment';
    }

    // Check if there are any error messages
    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    // Send email logic (same as before)
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
      transactionId: paymentMethod === 'online' ? formData.transactionId : 'N/A',
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
      deliveryPrice: deliveryPrice,
      cartItems: cartDetailsHTML,
      totalAmount: totalAmount,
    };

    emailjs.send('service_npm3w4s', 'template_kxaxitx', templateParams, 'lDwAV3uAut8ihKZId')
      .then(() => {
        return emailjs.send('service_npm3w4s', 'template_6pjk3uf', templateParams, 'lDwAV3uAut8ihKZId');
      })
      .then(() => {
        clearCart();
        setShowDialog({ success: true, message: 'Payment submitted successfully! Order confirmation emails sent!' });
        setTimeout(() => {
          setShowDialog(null);
          router.push("/");
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending payment details:', error);
        setShowDialog({ success: false, message: 'Payment failed. Please try again!' });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Complete Your Payment</h2>

        <div className="border-b pb-4 mb-4 bg-teal-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-teal-700">Order Summary</h3>
          <ul className="text-gray-700 space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-1">
                <span>{item.name} x {item.quantity}</span>
                <span className="text-teal-700 font-bold">Rs. {item.price * item.quantity}</span>
              </li>
            ))}
            <li className="flex justify-between py-1">
              <span>Delivery:</span>
              <span className="text-teal-700 font-bold">Rs. {deliveryPrice}</span>
            </li>
          </ul>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg text-black">
            <strong>Total Amount:</strong>
            <strong className="text-teal-800">Rs. {totalAmount}</strong>
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-6 mt-4 text-black">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'online')}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          {paymentMethod === 'online' && (
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-3 text-teal-600">Bank Details:</h3>
              <ul className="text-gray-800 space-y-2">
                <li><strong>Bank Name:</strong> Meezan Bank</li>
                <li><strong>Recipient Name:</strong> GHUFRANA ZAKARIA/MUNEEBA BADAR</li>
                <li><strong>Account Number:</strong> 01050110517736</li>
                <li><strong>IBAN Number:</strong> PK60MEZN0001050110517736</li>
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border ${errorMessages.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errorMessages.name && <p className="text-red-500 text-sm">{errorMessages.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border ${errorMessages.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errorMessages.email && <p className="text-red-500 text-sm">{errorMessages.email}</p>}
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border ${errorMessages.whatsapp ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errorMessages.whatsapp && <p className="text-red-500 text-sm">{errorMessages.whatsapp}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              value={formData.address}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-4 py-2 border ${errorMessages.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errorMessages.address && <p className="text-red-500 text-sm">{errorMessages.address}</p>}
          </div>

          {paymentMethod === 'online' && (
            <div>
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                value={formData.transactionId}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-4 py-2 border ${errorMessages.transactionId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errorMessages.transactionId && <p className="text-red-500 text-sm">{errorMessages.transactionId}</p>}
            </div>
          )}

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
