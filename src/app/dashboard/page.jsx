"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Correct import for useRouter in app directory
import StatsCard from "@/component/StatsCard";
import TopStock from "@/component/TopStock";
import SearchBar from "@/component/SearchBar";

export default function DashboardPage() {
  const [totalStockPrice, setTotalStockPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);  
  const [totalSales, setTotalSales] = useState(0);
  const router = useRouter();  // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products data to calculate total stock and products count
        const productsRes = await fetch('/api/products');
        const products = await productsRes.json();

        const totalStock = products.reduce(
          (acc, product) => acc + product.Quantity * product.Price,
          0
        );
        const totalProductsCount = products.length; 

        setTotalStockPrice(totalStock);
        setTotalProducts(totalProductsCount);

        // Fetch sales data to calculate total sales
        const salesRes = await fetch('/api/sells');
        const sales = await salesRes.json();

        const totalSalesAmount = sales.reduce(
          (acc, sale) => acc + sale.TotalPrice,
          0
        );

        setTotalSales(totalSalesAmount);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Function to handle the click event and redirect based on card
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 cursor-pointer">
        <StatsCard
          title="Total Stock Price"
          value={`₹${totalStockPrice.toFixed(2)}`}
          onClick={() => handleNavigation('/View-All-Products')}  // Handle click for stock
        />
        <StatsCard
          title="Number of Products"
          value={totalProducts}
          onClick={() => handleNavigation('/View-All-Products')}  // Handle click for products
        />
        <StatsCard
          title="Total Sales"
          value={`₹${totalSales.toFixed(2)}`}
          onClick={() => handleNavigation('/View-All-Sales')}  // Handle click for sales
        />
      </div>
      <div className="grid-cols-1 md:grid-cols-1 gap-6">
        <TopStock />
      </div>
    </div>
  );
}
