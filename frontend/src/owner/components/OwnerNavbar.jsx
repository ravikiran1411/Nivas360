import { useNavigate } from "react-router-dom"
import logo from "../../assets/nivas_logo.png"

const OwnerNavbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (

    <div className="flex justify-between items-center px-6 py-3 bg-white shadow">

      <div className="flex items-center gap-3">

        <img src={logo} className="w-8" />

        <h2 className="text-xl font-bold">
          Owner Dashboard
        </h2>

      </div>

      <button
        onClick={logout}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  )
}

export default OwnerNavbar;