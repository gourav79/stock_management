'use client';

import { useEffect, useState } from 'react';

const UpdateProductForm = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    price: ''
  });
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
        setSuggestions(
          products.filter((p) =>
            p.ProductName.toLowerCase().includes(value.toLowerCase())
          )
        );
        setNotFound(true);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const res = await fetch(`/api/products/${selectedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price)
      })
    });

    if (res.ok) {
      alert('Product updated!');
      setFormData({ name: '', stock: '', price: '' });
      setSearch('');
      setSelectedProduct(null);
    } else {
      alert('Failed to update product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Product</h2>

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

      {/* Show Product Info in Table */}
      {selectedProduct && (
        <div className="mb-4 border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Current Product Details</h3>
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

      {/* Update Fields */}
      {selectedProduct && (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">New Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter new product name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700">New Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter new stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">New Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter new price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;
