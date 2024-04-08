import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col sm:flex-row dark:bg-gray-900">
        <Sidebar />
        <div className="py-4 px-5 sm:p-10 flex-grow">
          <Outlet />
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default App;
