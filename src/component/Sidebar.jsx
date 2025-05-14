"use client";
import { useRouter } from 'next/navigation';



const Sidebar = () => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <aside className="w-45 bg-gray-300 shadow-md min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Stock Manager</h2>
      <nav className="space-y-4">
      <div
        onClick={() => handleNavigation('/dashboard')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        Dashboard
      </div>

      <div
        onClick={() => handleNavigation('/Add-product')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        Add Product
      </div>

      <div
        onClick={() => handleNavigation('/View-All-Products')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        View All Products
      </div>

      <div
        onClick={() => handleNavigation('/Update-Product')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        Update Product
      </div>

      <div
        onClick={() => handleNavigation('/Delete-Product')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        Delete Product
      </div>
      <div
        onClick={() => handleNavigation('/Sell-Product')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        Sell Product
      </div>
      <div
        onClick={() => handleNavigation('/View-All-Sales')}
        className="block text-blue-600 hover:underline cursor-pointer"
      >
        View All Sales
      </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
