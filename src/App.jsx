import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row dark:bg-gray-900">
      <Sidebar />
      <div className="py-4 px-5 sm:p-10 flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default App;
