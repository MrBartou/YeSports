import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="min-h-screen flex dark:bg-gray-900">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App
