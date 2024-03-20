import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="min-h-screen flex dark:bg-gray-900">
      <Sidebar />
      <div className="p-10 flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default App;
