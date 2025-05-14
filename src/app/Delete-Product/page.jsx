'use client';

import { useEffect, useState } from 'react';

const DeleteProductForm = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const matched = products.find(
      (p) => p.ProductName.toLowerCase() === value.toLowerCase()
    );

    if (matched) {
      setSelectedProduct(matched);
      setNotFound(false);
      setSuggestions([]);
    } else {
      setSelectedProduct(null);
      if (value.trim()) {
        const matches = products.filter((p) =>
          p.ProductName.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
        setNotFound(matches.length === 0);
      } else {
        setSuggestions([]);
        setNotFound(false);
      }
    }
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setSearch(product.ProductName);
    setSuggestions([]);
    setNotFound(false);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedProduct.ProductName}"?`
    );
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${selectedProduct._id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('Product deleted successfully!');
      setSearch('');
      setSelectedProduct(null);
      setSuggestions([]);
      setNotFound(false);

      // Refresh product list
      const updated = await fetch('/api/products');
      const data = await updated.json();
      setProducts(data);
    } else {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Delete Product</h2>

      {/* Search Field */}
      <div className="mb-4 relative">
        <label htmlFor="search" className="block text-gray-700">Search Product</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Type product name..."
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full z-10 max-h-40 overflow-auto mt-1 rounded-md shadow">
            {suggestions.map((product) => (
              <li
                key={product._id}
                onClick={() => handleSuggestionClick(product)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {product.ProductName}
              </li>
            ))}
          </ul>
        )}
        {notFound && suggestions.length === 0 && (
          <p className="text-red-500 mt-2">Product not found</p>
        )}
      </div>

      {/* Product Details Table */}
      {selectedProduct && (
        <div className="mb-4 border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Product to be Deleted</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">{selectedProduct.ProductName}</td>
                <td className="border-b p-2">{selectedProduct.Quantity}</td>
                <td className="border-b p-2">₹{selectedProduct.Price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Button */}
      {selectedProduct && (
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductForm;
