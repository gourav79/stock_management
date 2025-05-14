"use client";

import { useState } from 'react';

export default function AddProductPage() {
  const [form, setForm] = useState({ name: '', stock: '', price: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ProductName: form.name,
          Quantity: Number(form.stock),
          Price: parseFloat(form.price),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Product added successfully!');
        setForm({ name: '', stock: '', price: '' });
      } else {
        setErrorMessage(data.message || 'Failed to add product.');
      }

    } catch (err) {
      setErrorMessage('Server error. Please try again.');
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>

      {successMessage && (
        <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mb-4 text-red-600 font-medium">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Enter quantity"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            min="0"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
