import "./globals.css";
import Navbar from "@/component/Navbar";
import Sidebar from "@/component/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-100">
          {/* Make Navbar sticky */}
          <div className="sticky top-0 z-50 bg-white shadow">
            <Navbar />
          </div>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
