import Sidebar from "../components/Sidebar"
import OwnerNavbar from "../components/OwnerNavbar"
import { Outlet } from "react-router-dom"

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <OwnerNavbar />

        <div className="p-6">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default OwnerLayout;