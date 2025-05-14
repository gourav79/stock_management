"use client";
import { useState, useEffect } from 'react'

export default function ViewAllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        console.log(response)
        // Check if the response status is OK (200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Assuming the products are directly in the response
        setProducts(data); // The response should be an array of products
        setLoading(false); // Stop loading after fetching
      } catch (err) {
        setError(err.message); // Set the error message
        setLoading(false); // Stop loading on error
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Stock Inventory</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="p-4 border-b">Product Name</th>
              <th className="p-4 border-b">Quantity</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b">{product.ProductName}</td>
                <td className="p-4 border-b">{product.Quantity}</td>
                <td className="p-4 border-b">₹{product.Price.toFixed(2)}</td>
                <td className="p-4 border-b">₹{(product.Quantity * product.Price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
